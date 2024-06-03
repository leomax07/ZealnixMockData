import { useState } from "react";
import { useSelector } from "react-redux";
import FormStepperTab from "../../../Components/FormStepperTab/Index";
import MedicalHistory from "./MedicalHistory";
import PatientInformation from "./PatientInformation";
import MobileAppLogin from "./MobileAppLogin";
import { RootState } from "../../../redux/store";
import { stepperOptions } from "../../../constants";

interface AddNewPatientType {
  edit?: boolean;
}

function AddNewPatientsIndex({ edit }: AddNewPatientType) {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const { editPatient } = useSelector<RootState, RootState["patientsReducers"]>(
    (state) => state.patientsReducers,
  );

  return (
    <div className="page__container add__new__patients__container">
      {edit ? (
        <div className="page__header">Edit Patient</div>
      ) : (
        <div className="page__header">Add New Patient</div>
      )}

      <div className="page__description light__grey__text">
        Description. Lorem ipsum dolor sit amet, ex lucilius hendrerit vim,
        tempor scaevola iudicabit ei ius.
      </div>
      <div className="small__header">Patient Information</div>
      <div className="add__new__patient__stepper__tabs__container">
        <FormStepperTab
          tabOptions={stepperOptions}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </div>
      <div className="add__new__patient__form__container">
        {selectedIndex === 1 && (
          <PatientInformation
            setIndex={setSelectedIndex}
            edit={edit}
            editPatient={editPatient}
          />
        )}
        {selectedIndex === 2 && (
          <MedicalHistory
            setIndex={setSelectedIndex}
            edit={edit}
            editPatient={editPatient}
          />
        )}
        {selectedIndex === 3 && (
          <MobileAppLogin edit={edit} editPatient={editPatient} />
        )}
      </div>
    </div>
  );
}

export default AddNewPatientsIndex;
