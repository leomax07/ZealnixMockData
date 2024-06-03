import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddNewModal from "../../../../Components/AddNewModal/Index";
import GridAndListToggleHeader from "../../../../Components/GridAndListToggleHeader/Index";
import TextInputComponent from "../../../../Components/TextInput/Index";
import { HOSPITAL_ID } from "../../../../constants";
import { AppDispatch, RootState } from "../../../../redux/store";
import DesignationTable from "./DesignationTable";
import {
  createNewDesignation,
  fetchAllDestinations,
} from "./store/designation.middleware";

export default function DesignationsPage(): ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [view, setView] = useState("list");
  const [search, setSearch] = useState("");
  const [showAddNew, setShowAddNew] = useState(false);
  const [name, setName] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { designations } = useSelector<
    RootState,
    RootState["designationReducers"]
  >((state) => state.designationReducers);

  useEffect(() => {
    dispatch(fetchAllDestinations());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleAddNew = () => {
    setShowAddNew((prev) => !prev);
  };

  const handleCreateNewDesignation = async (designationName: string) => {
    const payload: any = {
      name: designationName,
      status: "active",
      hospitalId: HOSPITAL_ID,
    };

    await dispatch(createNewDesignation(payload));
    await dispatch(fetchAllDestinations());
    setShowAddNew(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  return (
    <div className="designation__conatainer">
      <GridAndListToggleHeader
        changeTab={setView}
        handleAddNewClick={toggleAddNew}
        setSearch={setSearch}
      />
      <br />
      <DesignationTable data={designations} search={search} />
      <AddNewModal
        visible={showAddNew}
        setVisible={toggleAddNew}
        header="New Designation"
        handleSaveClick={() => handleCreateNewDesignation(name)}
        disabled={name.length <= 4}
      >
        <div className="add__new__designation__input">
          <TextInputComponent
            label="Role name"
            value={name}
            onChange={handleChange}
          />
        </div>
      </AddNewModal>
    </div>
  );
}
