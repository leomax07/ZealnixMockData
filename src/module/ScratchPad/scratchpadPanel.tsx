import { EditIcon, TrashIcon } from "evergreen-ui";
import { OverlayPanel } from "primereact/overlaypanel";
import React, { useRef } from "react";
import dots from "../../Icon/dots.svg";
import { ScratchpadType } from "./store/scratchpadType";

interface Props {
  rowData: any;
  handleAction: Function;
  setSelectedItem?: any;
}

export default function ScratchpadPanel({
  rowData,
  handleAction,
  setSelectedItem,
}: Props) {
  const op = useRef<OverlayPanel>(null);

  const toggleOverlay = (e: any, row: ScratchpadType) => {
    op?.current?.toggle(e);
    setSelectedItem(row);
  };

  const handleClick = (type: string, row: ScratchpadType) => {
    const action = {
      type,
      payload: row,
    };
    handleAction(action);
  };

  return (
    <div className="overlay_action">
      <div
        onClick={(e) => toggleOverlay(e, rowData)}
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
          onClick={() => handleClick("edit", rowData)}
        >
          <EditIcon color="black" className="overlay_action blue__on__hover" />
          Edit
        </div>
        <div
          className="overlay_action delete__container list__item"
          onClick={() => handleClick("delete", rowData)}
        >
          <TrashIcon className="overlay_action" /> Delete
        </div>
      </OverlayPanel>
    </div>
  );
}
