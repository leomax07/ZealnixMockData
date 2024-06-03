import moment from "moment";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, TabNavigation } from "evergreen-ui";
import { useFormik } from "formik";
import AddNewModal from "../../Components/AddNewModal/Index";
import ButtonComponent from "../../Components/Buttons/Index";
import SearchInputComponent from "../../Components/SearchInput/searchInput";
import TextAreaComponent from "../../Components/TextAreaComponent/Index";
import TextInputComponent from "../../Components/TextInput/Index";
import { SCRATCHPAD_TYPE, SCRATCH_TABS } from "../../constants";
import { AppDispatch, RootState } from "../../redux/store";
import {
  createScratchpad,
  deleteScratchpad,
  getScratchpads,
  updateScratchpad,
} from "./store/scratchpadMiddleware";
import { ScratchpadType } from "./store/scratchpadType";
import FilterDropdown from "../../Components/FilterDropdown/Index";
import ChipsComponent from "../../Components/Chips/Index";
import { scratchpadSchema } from "../../utils/validationSchema";
import ScratchpadPanel from "./scratchpadPanel";

function ScratchPad() {
  const initialState = {
    title: "",
    type: "",
    content: "",
    pinned: false,
    tags: [],
  };
  const [selectedTab, setSelectedTab] = useState(0);
  const [showAddnew, setShowAddNew] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const [selectedId, setSelectedId] = useState("");
  const { scratchpads } = useSelector<
    RootState,
    RootState["scratchpadReducer"]
  >((state) => state.scratchpadReducer);
  const dispatch = useDispatch<AppDispatch>();
  const [scratchpadData, setScratchpadData] =
    useState<ScratchpadType>(initialState);

  useEffect(() => {
    dispatch(getScratchpads({}));
  }, []);

  const handleSave = async () => {
    try {
      const payload: any = {
        ...scratchpadData,
      };
      if (selectedItem) {
        await dispatch(updateScratchpad(payload)).then(() => {
          dispatch(getScratchpads({}));
        });
      } else {
        dispatch(createScratchpad(payload)).then(() => {
          dispatch(getScratchpads({}));
        });
      }
      setShowAddNew(!showAddnew);
    } catch (err) {
      console.log(err);
    }
  };

  const { errors, touched, handleSubmit, handleBlur } = useFormik({
    initialValues: {
      title: scratchpadData.title,
      type: scratchpadData.type,
      content: scratchpadData.content,
      tags: scratchpadData.tags,
    },
    validationSchema: scratchpadSchema,
    enableReinitialize: true,
    onSubmit: () => {
      handleSave();
    },
  });

  const toggleAddNew = () => {
    setShowAddNew((prev) => !prev);
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setScratchpadData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAction = (action: any) => {
    const { type, payload } = action;
    switch (type) {
      case "delete":
        setSelectedId(payload.id);
        setShowConfirmation(true);
        break;
      case "edit":
        setScratchpadData({
          ...payload,
        });

        setShowAddNew(true);
        break;

      default:
        break;
    }
  };

  const handleDeleteScratchpad = async () => {
    await dispatch(deleteScratchpad(selectedId)).then(() => {
      setShowConfirmation(false);
      dispatch(getScratchpads({}));
    });
  };

  const getData = async () => {
    if (selectedTab > 0) {
      await dispatch(
        getScratchpads({
          where: {
            type: selectedTab === 1 ? "personal" : "web",
          },
        }),
      );
    } else {
      await dispatch(getScratchpads({}));
    }
  };

  useEffect(() => {
    getData();
  }, [selectedTab]);

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <div className="page__container scratchpad__page__container">
      <div className="left half">
        <TabNavigation>
          {SCRATCH_TABS.map((tab, index) => (
            <Tab
              isSelected={selectedTab === index}
              key={tab.index}
              onClick={() => handleTabClick(tab.index)}
              className="each__tab"
            >
              {tab.label}
            </Tab>
          ))}
        </TabNavigation>
      </div>
      <div className="header">
        <p className="title">All notes</p>
        <div className="right">
          <SearchInputComponent />
          <ButtonComponent
            label="Add New"
            onClick={() => {
              setScratchpadData(initialState);
              setSelectedItem(null);
              toggleAddNew();
            }}
          />
        </div>
      </div>
      <div className="list__container">
        {[{}, {}, {}, {}, {}].map((note) => (
          <div key='dfghj' className="card">
            <div className="scratchpad__Title__align">
              <div className="tags__container">
                {[{}]?.map((tag) => (
                  <div className="tag" key='rthy'>
                    Test 1
                  </div>
                ))}
              </div>
              <ScratchpadPanel
                rowData={note}
                handleAction={handleAction}
                key='56'
                setSelectedItem={setSelectedItem}
              />
            </div>

            <p className="title">
              <span className="dot" />
              {/* {note.title} */}
            note 1
            </p>
            <p className="notes">note 2</p>
            <p className="date">{moment().format("DD/MM/YYYY h:mm A")}</p>
          </div>
        ))}
      </div>

      {showConfirmation && (
        <AddNewModal
          visible={showConfirmation}
          setVisible={setShowConfirmation}
          header="Delete Scratchpad"
          primaryLabel="Delete"
          handleSaveClick={handleDeleteScratchpad}
        >
          <p>Are you sure, you want to delete this Scratchpad?</p>
        </AddNewModal>
      )}

      <AddNewModal
        setVisible={toggleAddNew}
        visible={showAddnew}
        header={selectedItem ? "Edit Note" : "Add Note"}
        handleSaveClick={() => handleSubmit()}
        primaryLabel={selectedItem ? "Update" : "Add"}
      >
        <div className="form__container">
          <TextInputComponent
            classNames="full__width"
            label="Note Title"
            value={scratchpadData.title}
            name="title"
            required
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {touched.title && errors.title && (
            <div className="formik_error">{errors.title}</div>
          )}
          <br />
          <FilterDropdown
            classNames="full__width"
            label="Type"
            name="type"
            value={scratchpadData.type}
            items={SCRATCHPAD_TYPE}
            required
            onBlur={handleBlur}
            handleChange={handleChange}
          />
          {touched.type && errors.type && (
            <div className="formik_error">{errors.type}</div>
          )}
          <br />
          <ChipsComponent
            className="full__width"
            label="Tags"
            name="tags"
            value={scratchpadData.tags}
            onChange={handleChange}
          />

          <br />
          <TextAreaComponent
            label="Notes Content"
            subText="Add a few lines about your note"
            inputClassName="full__width"
            value={scratchpadData.content}
            name="content"
            onChange={handleChange}
          />
        </div>
      </AddNewModal>
    </div>
  );
}

export default ScratchPad;
