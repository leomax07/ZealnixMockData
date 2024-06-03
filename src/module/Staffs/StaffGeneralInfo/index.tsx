import moment from "moment";
import { useSelector } from "react-redux";
import { dutyTimeTemplateHelper } from "../../../Components/DataTableTemplates/Index";
import { RootState } from "../../../redux/store";

function StaffsGeneralInfo() {
  const { staffDetail } = useSelector<RootState, RootState["staffsReducers"]>(
    (state) => state.staffsReducers,
  );

  const formatDOB = (date: string) =>
    moment(new Date(date)).format("DD/MM/YYYY");

  return (
    <div className="staff__general__profile__container">
      <p className="header">General info</p>

      <div className="details__container">
        <div className="details">
          <p className="title">DOB</p>
          <p className="detail">{formatDOB(staffDetail.dateOfBirth)}</p>
        </div>
        <div className="details">
          <p className="title">Email</p>
          <p className="detail">{staffDetail.email}</p>
        </div>
        <div className="details two__cell">
          <p className="title">Phone</p>
          <p className="detail">{staffDetail.phone}</p>
        </div>
        <div className="details">
          <p className="title">Branch</p>
          <p className="detail">{staffDetail.branch.name}</p>
        </div>
        <div className="details">
          <p className="title">Department</p>
          <p className="detail">{staffDetail.department.name}</p>
        </div>
        <div className="details">
          <p className="title">Designation</p>
          <p className="detail">{staffDetail.designationId}</p>
        </div>
        <div className="details">
          <p className="title">Duty time</p>
          <p className="detail">
            {dutyTimeTemplateHelper(staffDetail.dutyInTime)} -
            {dutyTimeTemplateHelper(staffDetail.dutyOutTime)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StaffsGeneralInfo;
