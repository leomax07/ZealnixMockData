import { Tab, TabNavigation } from "evergreen-ui";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../../Components/Buttons/Index";
import SearchInputComponent from "../../../Components/SearchInput/searchInput";
import { AllAppoinment } from "../../Appointments/mock";
import {
  BRANCH_ID,
  HOSPITAL_ID,
  IN_PATIENT_STATUS,
  OUT_PATIENT_STATUS,
  SORT_BY_CREATEDAT_DESC,
} from "../../../constants";
import { AppDispatch, RootState } from "../../../redux/store";
import { getPatients } from "../store/patientMiddleware";
import { PatientFilter } from "../store/patientTypes";
import PatientsTable from "./PatientsTable";
import { setEditPatient } from "../store/patientsReducer";

function AllPatients() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { patients } = useSelector<RootState, RootState["patientsReducers"]>(
    (state) => state.patientsReducers
  );

  const getData = async () => {
    const payload: PatientFilter = {
      order: SORT_BY_CREATEDAT_DESC,
      where: {
        hospitalId: HOSPITAL_ID,
        branchId: BRANCH_ID,
      },
    };

    if (selectedIndex) {
      payload.where.status =
        selectedIndex === 1 ? IN_PATIENT_STATUS : OUT_PATIENT_STATUS;
    }

    await dispatch(getPatients(payload));
  };

  useEffect(() => {
    getData();
  }, [selectedIndex]);

  const handleTabClick = (index: number) => {
    setSelectedIndex(index);
  };

  const patientsOptions = [
    {
      index: 0,
      label: "All",
    },
    {
      index: 1,
      label: "In Patients",
    },
    {
      index: 2,
      label: "Out patients",
    },
  ];

  const handleAddNew = () => {
    dispatch(setEditPatient({}));
    navigate("/patients/add");
  };
  return (
    <div className="patients__table__container">
      {/* <div className="description">
        Description. Lorem ipsum dolor sit amet, ex lucilius hendrerit vim,
        tempor scaevola iudicabit ei ius.
      </div> */}
      <div className="patients__table__filters__container">
        <div className="left half">
          <TabNavigation>
            {patientsOptions.map((tab, index) => (
              <Tab
                isSelected={selectedIndex === index}
                key={tab.index}
                onClick={() => handleTabClick(tab.index)}
                className="each__tab"
              >
                {tab.label}
              </Tab>
            ))}
          </TabNavigation>
        </div>
        <div className="right half">
          <SearchInputComponent />
          <ButtonComponent label="Add new" onClick={handleAddNew} />
        </div>
      </div>
      <div className="table__conatiner">
        <PatientsTable data={AllAppoinment} />
      </div>
    </div>
  );
}

export default AllPatients;
