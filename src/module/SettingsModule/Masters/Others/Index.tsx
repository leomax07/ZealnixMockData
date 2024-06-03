import { Checkbox } from "evergreen-ui";
import { useState } from "react";
import AddNewModal from "../../../../Components/AddNewModal/Index";
import GridAndListToggleHeader from "../../../../Components/GridAndListToggleHeader/Index";
import TagInputComponent from "../../../../Components/TagInputComponent/Index";
import TextInputComponent from "../../../../Components/TextInput/Index";
import OthersTable from "./OthersTable";

function OtherMasters() {
  const [view, setView] = useState("list");
  const [showAddNew, setShowAddNew] = useState(false);

  // remove this once the view is used
  console.log(view);

  const toggleAddNew = () => {
    setShowAddNew((prev) => !prev);
  };
  return (
    <div>
      <GridAndListToggleHeader
        changeTab={setView}
        handleAddNewClick={toggleAddNew}
      />
      <br />
      <OthersTable />
      <AddNewModal
        visible={showAddNew}
        setVisible={setShowAddNew}
        header="Others"
        className="add__new__label"
      >
        <div className="others__modal__container">
          <div className="two__input">
            <div className="half">
              <TextInputComponent label="Name" />
            </div>
            <div className="half">
              <TagInputComponent label="Category" />
            </div>
          </div>
          <br />
          <Checkbox label="Show on Main Tab" />
        </div>
      </AddNewModal>
    </div>
  );
}

export default OtherMasters;
