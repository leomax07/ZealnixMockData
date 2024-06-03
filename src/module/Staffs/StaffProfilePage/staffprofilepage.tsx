/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowLeftIcon } from "evergreen-ui";
import "./staffprofilepage.scss";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileImg from "../../../Icon/human.svg";
import BadgeComponent from "../../../Components/Badge/badge";
import TimeSet from "../../../Components/TimeSet/timeset";
import TabComponent from "../../../Components/Tab/tab";
import DiagnosisComponent from "../../../Components/Diagnosis/diagnosis";
import diagnosisData from "./mock";
import SearchInputComponent from "../../../Components/SearchInput/searchInput";
import ClipImage from "../../../Icon/clipboard.svg";
import { AppDispatch, RootState } from "../../../redux/store";
import { getStaffDetailsById } from "../store/staffsMiddleware";
import { dutyTimeTemplateHelper } from "../../../Components/DataTableTemplates/Index";
import { NURSE, PHARMACIST, STAFF_DETAILS_TABS } from "../../../constants";
import ButtonComponent from "../../../Components/Buttons/Index";

interface TabOptions {
  label: string;
  index: number | string;
  to: string;
}

function StaffProfilePage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const location = useLocation();
  const [search, setSearch] = useState("");
  const { type, id } = useParams();
  const navigation = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [tabObject, setTabObject] = useState<TabOptions[]>();
  const { staffDetail } = useSelector<RootState, RootState["staffsReducers"]>(
    (state) => state.staffsReducers,
  );

  const fetchData = async () => {
    const payload = {
      id,
      filter: {
        include: [
          {
            relation: "department",
            field: {
              id: true,
              name: true,
            },
          },
          {
            relation: "branch",
            field: {
              id: true,
              name: true,
            },
          },
        ],
      },
    };
    await dispatch(getStaffDetailsById(payload));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    STAFF_DETAILS_TABS(type || "", id || "").forEach((tab) => {
      if (tab.to === location.pathname) {
        setSelectedTab(tab.index);
      }
    });
  }, [location]);

  useEffect(() => {
    switch (type) {
      case PHARMACIST:
        setTabObject(
          STAFF_DETAILS_TABS(type, id || "").filter(
            (tabs) => tabs.label === "General Info",
          ),
        );
        break;
      case NURSE:
        setTabObject(
          STAFF_DETAILS_TABS(type, id || "").filter(
            (tabs) => tabs.label !== "Appointments",
          ),
        );
        break;
      default:
        setTabObject(STAFF_DETAILS_TABS(type || "", id || ""));
        break;
    }
  }, [type]);

  const handleBack = () => {
    navigation(`/staffs/${type}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="page__container">
      <div className="staff__profilepage__flex">
        <ArrowLeftIcon onClick={handleBack} />
        <div className="staff_profilepage_text">
          {type?.replace("_", " ")} Profile
        </div>
      </div>
      <div className="staff_profilepage_body">
        <div className="staff_profilepage_card">
          <img src={ProfileImg} alt="profileImg" />
          <div className="staff__profilepage__flex_column">
            <div className="staff_profilepage_name">{staffDetail.name}</div>
            <div className="staff_profilepage_id">
              Employee ID :{staffDetail.employeeId}
            </div>
            <div className="staff_profilepage_badge">
              <BadgeComponent title={type?.replace("_", " ")} />
              {staffDetail?.department?.name && (
                <BadgeComponent title={staffDetail?.department?.name} />
              )}
            </div>
            <TimeSet
              fromTime={dutyTimeTemplateHelper(staffDetail?.dutyInTime)}
              toTime={dutyTimeTemplateHelper(staffDetail?.dutyOutTime)}
            />
          </div>
        </div>
        <div className="staff_profilepage_tabs">
          <TabComponent
            taboptions={tabObject || []}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </div>
      </div>
      {selectedTab === 2 && (
        <div className="staff_profilepage_title_head">Recent Diagnosis</div>
      )}
      {selectedTab === 2 && (
        <div className="staff_profilepage_diagnosis">
          {diagnosisData.map((data: any) => (
            <DiagnosisComponent
              image={data.image}
              title={data.title}
              date={data.date}
              patientName={data.patientName}
              patientID={data.patientID}
            />
          ))}
        </div>
      )}
      <div className="staff__profilepage__flexSort">
        {selectedTab === 1 && (
          <div className="staff_profilepage_header">Appointments</div>
        )}
        {selectedTab === 3 && (
          <div className="staff_profilepage_header">All Reports</div>
        )}
        {selectedTab === 2 && (
          <div className="staff_profilepage_header">All Diagnosis</div>
        )}

        {selectedTab !== 0 && selectedTab !== 4 && selectedTab !== 5 && (
          <div className="staff_profilepage_searchClass">
            <SearchInputComponent
              placeholder="Search"
              value={search}
              onChange={handleSearch}
            />
          </div>
        )}
        {selectedTab !== 0 && selectedTab !== 4 && selectedTab !== 5 && (
          <div className="staff_profilepage_addbuttonClass">
            <ButtonComponent label="Export" image={ClipImage} />
          </div>
        )}
      </div>
      <div>
        <Outlet context={{ search }} />
      </div>
    </div>
  );
}

export default StaffProfilePage;
