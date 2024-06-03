import { EditIcon, TrashIcon } from "evergreen-ui";
import { OverlayPanel } from "primereact/overlaypanel";
import React, { useRef, useState } from "react";
import dots from "../../../Icon/dots.svg";
import { ENABLED } from "../../../constants";
import ToggleSvg from "../../../assets/ToggleSvg";
import "./staffgridview.scss";

interface Props {
  rowData: any;
  handleAction: Function;
  element?: "Icon" | "Button";
}

export default function StaffOverlayPanel({
  rowData,
  handleAction,
  element,
}: Props) {
  const [onHovered, setOnHovered] = useState(4);
  const op = useRef<OverlayPanel>(null);
  const OVERLAY_ACTION_CLASS =
    element === "Button" ? "overlay__button__click" : "overlay__icon__click";
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
    handleAction(action);
  };
  const handleDelete = () => {
    const action = { type: "delete", payload: rowData };
    handleAction(action);
  };
  const handleDisable = () => {
    const action = { type: "disable", payload: rowData };
    handleAction(action);
  };
  return (
    <div className="overlay_action">
      <div
        onClick={toggleOverlay}
        onKeyDown={toggleOverlay}
        role="button"
        tabIndex={0}
        className={`overlay_action ${OVERLAY_ACTION_CLASS}`}
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
          onKeyDown={handleEdit}
          tabIndex={0}
          role="button"
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
            onKeyDown={handleDisable}
            tabIndex={0}
            role="button"
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
          onKeyDown={handleDelete}
          tabIndex={0}
          role="button"
        >
          <TrashIcon className="overlay_action" /> Delete
        </div>
      </OverlayPanel>
    </div>
  );
}
