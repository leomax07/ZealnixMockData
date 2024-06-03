import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./staffgridview.scss";
import ProfileImg from "../../../Icon/profile.svg";
import CalImg from "../../../Icon/CalImg.svg";
import CloackImage from "../../../Icon/clock.svg";
import { dutyTimeTemplateHelper } from "../../../Components/DataTableTemplates/Index";
import {
  ACTIVE_STATUSES,
  INACTIVE_STATUSES,
  STAFF_TOOLTIP_MSG,
} from "../../../constants";
import StaffOverlayPanel from "./StaffOverlayPanel";
import { toastSuccess } from "../../../redux/ToastStore/toastReducer";
import { ToastPayloadType } from "../../../redux/ToastStore/toastType";
import ButtonComponent from "../../../Components/Buttons/Index";

interface StaffGridViewPropType {
  value: any[];
  handleEdit?: any;
  type: string | undefined;
}

interface StaffTimeHandlerProptype {
  inTime: number;
  outTime: number;
}

interface StatusBadgeProptype {
  status: "active" | "inactive" | "Inactive" | "Active";
}

export function TimeHandler({ inTime, outTime }: StaffTimeHandlerProptype) {
  const fromTime = dutyTimeTemplateHelper(inTime);
  const toTime = dutyTimeTemplateHelper(outTime);
  return (
    <div className="staff__duration__container">
      <div className="staff__duty__head">
        <img
          className="pi"
          src={CloackImage}
          width={14}
          height="auto"
          alt="clock"
        />
        Duty Time :
      </div>
      <div className="staff__duty__time">
        {fromTime} -{toTime}
      </div>
    </div>
  );
}

export function RoleBatch({ title }: { title: string }) {
  return <span className="role__badge">{title ?? ""}</span>;
}

export function StatusBatch({ status }: StatusBadgeProptype) {
  return (
    <>
      {ACTIVE_STATUSES.includes(status) && <span className="active__badge" />}
      {INACTIVE_STATUSES.includes(status) && (
        <span className="inactive_badge" />
      )}
    </>
  );
}

function StaffGridView({ value, handleEdit, type }: StaffGridViewPropType) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigation = (user: any) => {
    const staffId = user?.id ?? null;
    if (type === "pharmacist" && staffId) {
      navigate(`/staffs/${type}/${staffId}/generalinfo`);
      return;
    }
    if (staffId) navigate(`/staffs/${type}/${staffId}`);
  };

  const triggerToast = () => {
    const message: ToastPayloadType = {
      message: "great things comming soon",
    };
    dispatch(toastSuccess(message));
  };

  return (
    <div className="staff__grid__container">
      {value.map((user) => (
        <div className="card" key={user.id}>
          <div
            className="card__img__container"
            title={STAFF_TOOLTIP_MSG}
            onClick={() => handleNavigation(user)}
            onKeyDown={() => handleNavigation(user)}
            tabIndex={0}
            role="button"
          >
            <img
              className="profile__img"
              src={user?.profileImageUrl ?? ProfileImg}
              width={75}
              height={75}
              alt="Profile"
            />
          </div>
          <div className="card__text__container">
            <div className="staff__name__container">
              <div className="staff__name">{user?.name}</div>
              <div className="staff__id">
                {user.employeeId}
                <StatusBatch status={user.status} />
              </div>
            </div>
            <div className="staff__role">
              <RoleBatch title={user.type} />
            </div>
            <TimeHandler inTime={user.dutyInTime} outTime={user.dutyOutTime} />
          </div>
          <div className="card__footer__container">
            <ButtonComponent image={CalImg} label="Book Appointments" onClick={triggerToast} />
            <StaffOverlayPanel
              rowData={user}
              handleAction={handleEdit}
              element="Button"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default StaffGridView;
