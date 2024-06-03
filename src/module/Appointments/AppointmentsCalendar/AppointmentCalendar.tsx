/* eslint-disable consistent-return */
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import AppointmentTimelineCalendar from "../../../Components/AppointmentsTimeline/Index";
import RightSideBar from "../../../Components/RightSidebar/Index";
import { BRANCH_ID } from "../../../constants";
import { AppDispatch, RootState } from "../../../redux/store";
import { getAppointmentsCalendarData } from "../store/appointmentMiddleware";
import { AppoinmentsCalander } from "../mock";
import "./AppointmentCalendar.scss";
import SlotDetails from "./SlotDetails";

function AppointmentsCalendar() {
  const { appointmentCalendarData } = useSelector<
    RootState,
    RootState["appointmentReducers"]
  >((state) => state.appointmentReducers);
  const dispatch = useDispatch<AppDispatch>();
  const [resourceList, setResourceList] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const { date } = useOutletContext<any>();
  const { search } = useOutletContext<{ search: string }>();

  console.log(search);

  const handleFectchAppointments = async () => {
    const payload = {
      date: moment(date).startOf("day").toISOString(),
      branchId: BRANCH_ID,
      search,
    };
    await dispatch(getAppointmentsCalendarData(payload));
  };

  useEffect(() => {
    handleFectchAppointments();
  }, [date, selectedSlotId, search]);

  useEffect(() => {
    if (!appointmentCalendarData.length) return setResourceList([]);
    const doctorsList: any = appointmentCalendarData.map((doctorData: any) => ({
      ...doctorData,
      slotDetails: doctorData.doctor_schedule.map((item: any) => {
        const appointment = doctorData.appointments[item.id];

        return {
          ...item,
          regularAppointments: appointment?.regular?.length || 0,
          emergencyAppointments: appointment?.emergency?.length || 0,
          videoAppointments: appointment?.video?.length || 0,
          doctorId: doctorData.id,
        };
      }),
    }));
    setResourceList(doctorsList);
  }, [appointmentCalendarData]);

  const toggleSidebar = () => {
    setSelectedSlotId("");
    setSelectedDoctorId("");
  };

  return (
    <>
      <AppointmentTimelineCalendar
        appointmentsData={AppoinmentsCalander}
        currentDate={date}
        setSelectedSlotId={setSelectedSlotId}
        setSelectedDoctorId={setSelectedDoctorId}
      />
      <RightSideBar
        visible={!!selectedSlotId}
        setVisible={toggleSidebar}
        body={
          <SlotDetails
            slotId={selectedSlotId}
            date={date}
            doctorId={selectedDoctorId}
          />
        }
      />
    </>
  );
}
export default AppointmentsCalendar;
