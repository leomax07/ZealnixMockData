import { useState } from "react";
import { useSelector } from "react-redux";
import CalenderIcon from "../../../../assets/CalenderIcon";
import ButtonComponent from "../../../../Components/Buttons/Index";
import SearchInputComponent from "../../../../Components/SearchInput/searchInput";
import addNewButton from "../../../../assets/addNewButton.svg";
import AddNewAppointments from "../../../Appointments/AddNewAppointments";
import { RootState } from "../../../../redux/store";
import AddNewReport from "../../../Laboratory/Components/AddNewReport";

function DetailsTabHeader({ tabName }: { tabName?: string }) {
  const [visible, setVisible] = useState(false);
  const [reportVisible, setReportVisible] = useState(false);
  const { patient }: any = useSelector<
    RootState,
    RootState["patientsReducers"]
  >((state) => state.patientsReducers);

  const handleAddNewDialog = () => {
    if (tabName === "Appointments") {
      setVisible(!visible);
    } else if (tabName === "Reports") {
      setReportVisible(!reportVisible);
    }
  };
  const toggleModal = () => {
    setVisible((prev) => !prev);
  };
  return (
    <>
      {visible && (
        <AddNewAppointments
          visible={visible}
          setVisible={toggleModal}
          selectedItem={patient}
          isAppointment
        />
      )}
      {reportVisible && (
        <AddNewReport
          visible={reportVisible}
          setVisible={setReportVisible}
          selectedItem={patient}
          isReport
        />
      )}
      <div className="patient__details__tables__header__container">
        <div className="patient__details__left">Admissions</div>
        <div className="patient__details__right">
          <SearchInputComponent />
          <div className="cslender__filter__conatainer">
            <CalenderIcon />
          </div>

          <ButtonComponent
            label="Add new"
            image={addNewButton}
            onClick={handleAddNewDialog}
          />
        </div>
      </div>
    </>
  );
}

export default DetailsTabHeader;
