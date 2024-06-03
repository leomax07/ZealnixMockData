import "./diagnosis.scss";

interface Diagnosisprops {
  image?: string;
  date?: string;
  patientName?: string;
  patientID?: string;
  title?: string;
}
function DiagnosisComponent({
  image,
  date,
  patientName,
  patientID,
  title,
}: Diagnosisprops) {
  return (
    <div>
      <div className="diagnosis_component_head">
        <div className="diagnosis_component_body">
          <div className="diagnosis_component_card">
            <div className="diagnosis_component_flex">
              <div className="diagnosis_component_img">
                <img src={image} alt="some" />
              </div>
              <div className="diagnosis_component_text_flex">
                <div className="diagnosis_component_diagnosis_text">
                  {title}
                </div>
                <div className="diagnosis_component_diagnosis_date">{date}</div>
              </div>
            </div>
            <div className="diagnosis_component_patient_flex">
              <div className="diagnosis_component_patient">Patient : </div>
              <div className="diagnosis_component_value">{patientName}</div>
            </div>
            <div className="diagnosis_component_patient_flex">
              <div className="diagnosis_component_patient">Patient ID : </div>
              <div className="diagnosis_component_value">{patientID}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiagnosisComponent;
