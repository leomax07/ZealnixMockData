import moment from "moment";
import { ProgressBar } from "primereact/progressbar";
import { DownloadIcon, EditIcon, TrashIcon } from "evergreen-ui";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef, useState } from "react";
import {
  PaginatorCurrentPageReportOptions,
  PaginatorPageLinksOptions,
} from "primereact/paginator";
import ProfileImg from "../../Icon/profile.svg";
import mockImg from "../../assets/mock-circle-img.png";
import ToggleSvg from "../../assets/ToggleSvg";
import dots from "../../Icon/dots.svg";
import eye from "../../Icon/eyeIcon.svg";
import ButtonComponent from "../Buttons/Index";
import { concertMinutesToTimeString } from "../../utils/reusableFunctions";
import {
  ACTIVE_STATUSES,
  COMPLETED_STATUSES,
  ENABLED,
  INACTIVE_STATUSES,
  PENDING_STATUSES,
} from "../../constants";
import AssignIcon from "../../assets/assign";
import MaintenanceIcon from "../../assets/maintenance";

export const hotlinkTemplateHelper = (string: string) => (
  <p className="blue__text">{string}</p>
);

export const tableDateTemplate = (date: string) =>
  date ? moment(new Date(date)).format("MMM Do, YYYY") : "";

export const priceRupeesTemplate = (price: number) => `₹ ${price.toFixed(2)}`;
export const inStockTemplateHelper = (row: any) => (
  <div className="in__stock__container">
    <p className="stock">{row.stock}</p>
    <div className="progress__part">
      <ProgressBar
        className={row?.inStock > 50 ? "green" : "yellow"}
        value={row.inStock}
      />
    </div>
  </div>
);
export function StatusTemplate(rowData: any) {
  return (
    <div className="flexAlign status__template__container">
      {ACTIVE_STATUSES.includes(rowData?.status) && (
        <div className="active__status__badge" />
      )}
      {INACTIVE_STATUSES.includes(rowData?.status) && (
        <div className="inactive__status__badge" />
      )}
      <span className="statusClass capitalize">
        {rowData?.status?.replace(/_/g, " ")}
      </span>
    </div>
  );
}

export const statusTemplateHelper = (row: any) => (
  <div className="status__template__container">
    {ACTIVE_STATUSES.includes(row.status) && (
      <div className="active__status__badge" />
    )}
    {INACTIVE_STATUSES.includes(row.status) && (
      <div className="inactive__status__badge" />
    )}
    {COMPLETED_STATUSES.includes(row.status) && (
      <div className="completed__status__badge" />
    )}
    {PENDING_STATUSES.includes(row.status) && (
      <div className="pending__status__badge" />
    )}
    <p className="status">{row.status}</p>
  </div>
);
export const appointmentStatusTemplateHelper = (row: any) => (
  <div className="appointment_status_container">
    {row.status && <div className={`${row.status}__status__badge`} />}
    <p className="status">{row.status}</p>
  </div>
);
export function CategoryTemplateHelper(rowData: any) {
  return (
    <span className="table__assets__category">
      {rowData?.category || rowData}
    </span>
  );
}
export function DepartmentTemplateHelper(rowData: any) {
  return (
    <span className="table__assets__category">
      {rowData?.department || rowData}
    </span>
  );
}
export const detailsTemplate = (id?: string, handleClick?: Function) => (
  <div className="profileBox" onClick={() => handleClick && handleClick(id)}>
    <img src={ProfileImg} alt="ProfileImage" />
    <span>Profile</span>
  </div>
);
export const downloadTemplate = (text?: any, rowData?: any) => (
  <a className="text__decoration" href={rowData}>
    <div className="download__button__container">
      <DownloadIcon />
      {text && <div className="text">{text && text}</div>}
    </div>
  </a>
);
export function ProfileImageTemplate(rowData: any) {
  return (
    <div className="flexAlign">
      <img
        className="profile__img"
        alt="ProfileImage"
        src={
          rowData?.profileUrl ||
          rowData?.profilePicUrl ||
          rowData?.profileImageUrl ||
          rowData?.assetimage ||
          rowData?.reportFileUrl ||
          rowData?.imageUrl ||
          ProfileImg
        }
        width={32}
        height={32}
        style={{ verticalAlign: "middle" }}
      />
      <span className="vertical-align-middle ml-2 nameStyle">
        {rowData?.name ? rowData?.name : rowData?.assetsname}
      </span>
    </div>
  );
}

export function OverLayTemplateHelper(rowData: any, handleActions: any) {
  const [onHovered, setOnHovered] = useState(4);
  const op = useRef<OverlayPanel>(null);
  const handleHover = (index: number) => {
    setOnHovered(index);
  };
  const toggleOverlay = (e: any) => {
    op?.current?.toggle(e);
  };
  const handleEdit = () => {
    const action = {
      type: "edit",
      payload: rowData,
    };
    handleActions(action);
  };
  const handleDelete = () => {
    const action = { type: "delete", payload: rowData };
    handleActions(action);
  };
  const handleDisable = () => {
    const action = { type: "disable", payload: rowData };
    handleActions(action);
  };
  const handleAssign = () => {
    const action = { type: "assign", payload: rowData };
    handleActions(action);
  };
  const handleMaintenance = () => {
    const action = { type: "maintenance", payload: rowData };
    handleActions(action);
  };
  const handleMoveMaintenance = () => {
    const action = { type: "endMaintenance", payload: rowData };
    handleActions(action);
  };
  return (
    <div className="overlay_action">
      <div
        onClick={toggleOverlay}
        className="overlay_action overlay__icon__click"
      >
        <img className="overlay_action" src={dots} alt="dates" />
      </div>
      <OverlayPanel
        ref={op}
        className="overalay_action table__overlay__component"
      >
        <div className="overalay_action header">ACTIONS</div>
        <div
          className="overlay_action edit__container list__item blue__on__hover"
          onMouseEnter={() => handleHover(0)}
          onMouseLeave={() => handleHover(4)}
          onClick={handleEdit}
        >
          <EditIcon
            color={onHovered === 0 ? "blue" : "black"}
            className="overlay_action blue__on__hover"
          />{" "}
          Edit
        </div>

        {rowData?.status && (
          <div
            className="overlay_action disble__container list__item blue__on__hover"
            onMouseEnter={() => handleHover(1)}
            onMouseLeave={() => handleHover(4)}
            onClick={handleDisable}
          >
            <ToggleSvg color={onHovered === 1 ? "blue" : "black"} />{" "}
            {rowData?.status === ENABLED ? "Disable" : "Enable"}
          </div>
        )}

        <div
          className="overlay_action delete__container list__item"
          onMouseEnter={() => handleHover(2)}
          onMouseLeave={() => handleHover(4)}
          onClick={handleDelete}
        >
          <TrashIcon className="overlay_action" /> Delete
        </div>

        {rowData?.assetId && !rowData?.lastAssignedToId && (
          <div
            className="overlay_action disble__container list__item blue__on__hover"
            onMouseEnter={() => handleHover(3)}
            onMouseLeave={() => handleHover(4)}
            onClick={handleAssign}
          >
            <AssignIcon color={onHovered === 3 ? "blue" : "black"} />{" "}
            {rowData?.assignedTo ? "Re-Assign" : "Assign"}
          </div>
        )}

        {rowData?.assetId &&
          (rowData?.status === "in_use" ||
            rowData?.status === "unassigned") && (
            <div
              className="overlay_action disble__container list__item blue__on__hover"
              onMouseEnter={() => handleHover(4)}
              onMouseLeave={() => handleHover(4)}
              onClick={handleMaintenance}
            >
              <MaintenanceIcon color={onHovered === 4 ? "blue" : "black"} />{" "}
              Move to Maintenance
            </div>
          )}
        {rowData?.reason && rowData?.status === "pending" && (
          <div
            className="overlay_action disble__container list__item blue__on__hover"
            onMouseEnter={() => handleHover(5)}
            onMouseLeave={() => handleHover(4)}
            onClick={handleMoveMaintenance}
          >
            <div className="flex">
              <MaintenanceIcon color="red" />
              <p className="overlay__font">End Maintenance</p>
            </div>
          </div>
        )}
      </OverlayPanel>
    </div>
  );
}

export function AppointmentOverlayTemplateHelper(
  rowData: any,
  handleActions: any
) {
  const [onHovered, setOnHovered] = useState(4);
  const op = useRef<OverlayPanel>(null);
  const handleHover = (index: number) => {
    setOnHovered(index);
  };
  const toggleOverlay = (e: any) => {
    op?.current?.toggle(e);
  };
  const handleEdit = () => {
    const action = {
      type: "edit",
      payload: rowData,
    };
    handleActions(action);
  };
  const handleDelete = () => {
    const action = { type: "delete", payload: rowData };
    handleActions(action);
  };
  const handleStatusUpdate = () => {
    const action = { type: "update", payload: rowData };
    handleActions(action);
  };
  return (
    <div className="overlay_action">
      <div
        onClick={toggleOverlay}
        className="overlay_action overlay__icon__click"
      >
        <img className="overlay_action" src={dots} alt="dates" />
      </div>
      <OverlayPanel
        ref={op}
        className="overalay_action table__overlay__component"
      >
        <div className="overalay_action header">ACTIONS</div>
        <div
          className="overlay_action edit__container list__item blue__on__hover"
          onMouseEnter={() => handleHover(0)}
          onMouseLeave={() => handleHover(4)}
          onClick={handleEdit}
        >
          {
            <EditIcon
              color={onHovered === 0 ? "blue" : "black"}
              className="overlay_action blue__on__hover"
            />
          }{" "}
          Edit
        </div>
        <div
          className="overlay_action edit__container list__item blue__on__hover"
          onMouseEnter={() => handleHover(1)}
          onMouseLeave={() => handleHover(4)}
          onClick={handleStatusUpdate}
        >
          <i className="pi pi-cog" />
          Update Status
        </div>
        <div
          className="overlay_action delete__container list__item"
          onMouseEnter={() => handleHover(2)}
          onMouseLeave={() => handleHover(4)}
          onClick={handleDelete}
        >
          <TrashIcon
            className="overlay_action"
            color={onHovered === 2 ? "blue" : "grey"}
          />{" "}
          Delete
        </div>
      </OverlayPanel>
    </div>
  );
}

export const viewTemplateHelper = (
  handleClick: any,
  rowData?: any,
  setReportView?: any
) => {
  const handleView = (item: any) => {
    setReportView(item);
    handleClick();
  };
  return (
    <ButtonComponent
      image={eye}
      type="outlined"
      label="view"
      onClick={() => handleView(rowData)}
    />
  );
};

export const dutyTimeTemplateHelper = (minutes: number) => {
  const timeString = concertMinutesToTimeString(minutes);
  return moment(new Date(timeString)).format("hh:mm a");
};

export function DetailsTemplate(
  patientObj: any,
  handleClick: Function,
  type: string | undefined
) {
  return (
    <div
      className="profileBox"
      onClick={() => handleClick(patientObj?.id, type)}
    >
      <img src={ProfileImg} alt="ProfileImage" />
      <span>Profile</span>
    </div>
  );
}

export const appointmentTypeTempalteHelper = (rowData: { type: string }) => (
  <div
    className={`status__template__container ${rowData.type}__status__template`}
  >
    <p>{rowData.type}</p>
  </div>
);

export const paginatorTemplate = {
  layout:
    "CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown",
  CurrentPageReport: ({
    currentPage,
    totalPages,
    className,
  }: PaginatorCurrentPageReportOptions) => (
    <span className={className}>
      Page {currentPage} of {totalPages}
    </span>
  ),

  PageLinks: ({ className, onClick, page }: PaginatorPageLinksOptions) => (
    <button
      type="button"
      className={`${className} custom__page__links`}
      onClick={onClick}
    >
      {page + 1}
    </button>
  ),
};

export function AssignedToImageTemplate({
  profileImg,
}: {
  profileImg: string;
}) {
  return (
    <div className="flexAlign">
      <img
        alt="ProfileImage"
        src={profileImg}
        width={32}
        style={{ verticalAlign: "middle" }}
      />
    </div>
  );
}

export function DotsTemplate(row: any, action: any) {
  return (
    <div
      className="actionsContainer"
      onClick={() => {
        action(!!row);
      }}
    >
      <img src={dots} alt="menuIcon pointer" />
    </div>
  );
}

export function TimeTemplate({ dutyTime }: { dutyTime: any }) {
  return <span className="timeClass">{dutyTime}</span>;
}
export function VitalTemplate(rowData: any) {
  return <span className="timeClass">{rowData}</span>;
}
export function VitalsList(...vitals: number[]) {
  const units = ["cm", "kg", "F", "mmHg", "mmHg", "mg/dL"];

  return (
    <>
      {vitals.map((value, index) => (
        <span className="timeClass" key={value}>
          {value}-{units[index]} &nbsp;
        </span>
      ))}
    </>
  );
}
export function EmployeeIDTemplate(rowData: any) {
  return (
    <div>
      <span className="IdStyle">
        {rowData?.employeeId ||
          rowData?.assetItemId ||
          rowData?.assetId ||
          rowData?.patientid}
      </span>
    </div>
  );
}
export function AssetsCategory(rowData: any) {
  return (
    <span className="table__assets__category">
      {rowData?.category || rowData?.LabCategory || rowData?.name}
    </span>
  );
}

export function ItemName(rowData: any) {
  return <div>{rowData?.itemName || rowData?.name}</div>;
}

export function pharmacyImageTemplate(rowData: any) {
  return (
    <div className="flexAlign">
      <img
        className="profile__img"
        alt="ProfileImage"
        src={rowData?.image || mockImg}
        width={32}
        height={32}
        style={{ verticalAlign: "middle" }}
      />
      <span className="vertical-align-middle ml-2 nameStyle">
        {rowData?.name ?? "-"}
      </span>
    </div>
  );
}
