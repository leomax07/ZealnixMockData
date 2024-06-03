import React from "react";
import ButtonComponent from "../../../Components/Buttons/Index";
import SearchInputComponent from "../../../Components/SearchInput/searchInput";


interface Props {
  handleClick?: ()=> void;
  selectedtab:number
}

export default function AssetIndex({handleClick,selectedtab}:Props) {
  return (
    <div className="flexSort">
      <div className="searchClass">
        <SearchInputComponent placeholder="Search" />
      </div>

      {selectedtab === 2 ? "" : <div className="btn__align">
        <ButtonComponent label="Add" onClick={handleClick} />
      </div>}
    </div>
  );
}
