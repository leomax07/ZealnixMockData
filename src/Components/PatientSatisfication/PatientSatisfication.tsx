import "./PatientSatisfication.scss";
import Thumbsup from "../../Icon/Thumbsup.svg";

function PatientSatisfication() {
  return (
    <div className="patient_satisfication_head">
      <div className="patient_satisfication_body">
        <div className="patient_satisfication_title">Patient Satisfication</div>
        <div className="patient_satisfication_img">
          <img src={Thumbsup} alt="DoneImg" />
        </div>
        <div className="patient_satisfication_goodtext">Good !</div>
        <div className="patient_satisfication_percent">90%</div>
        <div className="patient_satification_sentence">
          of the patients were satisfied <br />
          with the visit
        </div>
      </div>
    </div>
  );
}

export default PatientSatisfication;
