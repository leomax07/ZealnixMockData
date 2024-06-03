import "./AppointmentsScreen.scss";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AppoinmentsCalander } from "./mock";
import TabComponent from "../../Components/Tab/tab";
import { APPOINTMENT_TAB_OPTIONS, BRANCH_ID } from "../../constants";
import GridAndListToggleHeader from "../../Components/GridAndListToggleHeader/Index";
import AddNewAppointments from "./AddNewAppointments";
import { getAppointmentsCalendarData } from "./store/appointmentMiddleware";
import { AppDispatch, RootState } from "../../redux/store";
import ButtonComponent from "../../Components/Buttons/Index";
import FilterDropdown from "../../Components/FilterDropdown/Index";

export type TabOptions = {
  label: string;
  to: string;
  index: number;
};

function AppointmentScreen() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [showAddNew, setShowAddNew] = useState(false);
  const tabOptions = APPOINTMENT_TAB_OPTIONS;
  const [search, setSearch] = useState("");
  const [selectedDay, setSelectedDay] = useState("Today");
  const dispatch = useDispatch<AppDispatch>();
  const [date, setDate] = useState(new Date().toString());
  const { departments } = useSelector<
    RootState,
    RootState["departmentsReducers"]
  >((rootState) => rootState.departmentsReducers);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");

  const toggleAddNew = () => {
    setShowAddNew((prev) => !prev);
  };

  const getFormatedDate = (dateSelected: string) =>
    moment(dateSelected).format("DD MMMM YYYY");

  const handleFectchAppointments = async () => {
    const payload = {
      date: moment(date).startOf("day").toISOString(),
      branchId: BRANCH_ID,
      search,
      departmentId: selectedDepartmentId,
    };
    await dispatch(getAppointmentsCalendarData(payload));
  };

  useEffect(() => {
    if (showAddNew) {
      // stoping api call while opening the modal
      return;
    }
    // to fetch data for appointment calender when new appointment created
    handleFectchAppointments();
  }, [showAddNew, selectedDepartmentId]);
  const toggleModal = () => {
    setShowAddNew((prev) => !prev);
  };

  const handleDepartmentSelection = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedDepartmentId(e.target.value);
  };

  const data = [
    "Emergency Medicine Department",
    "Internal Medicine Department",
    "Surgery Department",
    "Pediatrics Department",
    "Obstetrics and Gynecology Department",
    "Cardiology Department",
    "Radiology Department",
    "Dermatology Department",
    "Ophthalmology Department",
    "Psychiatry Department",
  ];

  return (
    <div className="page__container appointment__screen__container">
      <div className="appointment__screen__header__container">
        <div className="pharmacy__tabs__container appointment__tab__container">
          <TabComponent
            taboptions={tabOptions}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          <ButtonComponent label="Book Appointment" onClick={toggleModal} />
        </div>
        <div className="appointments__header__container">
          <p className="date__container">{getFormatedDate(date)}</p>

          <div className="appointments__header__container__left">
            <div>
              <FilterDropdown
                items={data}
                // optionLabel="name"
                // optionValue="id"
                // value={data}
                // handleChange={handleDepartmentSelection}
                placeholder="Department"
              />
            </div>

            <GridAndListToggleHeader
              showDatePicker
              showDatesTab
              hideGridToggle
              handleAddNewClick={toggleAddNew}
              buttonText="Book Appointment"
              setSearch={setSearch}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              selectedDate={date}
              setSelectedDate={setDate}
              hidePrimaryButton
            />
          </div>
        </div>
        <AddNewAppointments
          visible={showAddNew}
          setVisible={toggleModal}
          date={date}
        />
      </div>
      <Outlet context={{ search, date }} />
    </div>
  );
}

export default AppointmentScreen;
