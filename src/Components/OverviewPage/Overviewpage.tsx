import "./Overviewpage.scss";
import { useParams } from "react-router-dom";
import OverviewCard from "../OverViewCard/overviewcard";
import UpcomingEvent from "../UpcomingEvent/upcomingevent";
import PatientSatisfication from "../PatientSatisfication/PatientSatisfication";
import PanelLineChart from "../PanelineChart/PanelLineChart";
import PanelBarComponent from "../PanelBar/PanelBar";

function OverviewPage() {
  const { type } = useParams();
  return (
    <div>
      <div className="overview_page_head capitalize">
        Overview
        {type?.replace("_", " ")}
      </div>
      {type !== "lab_technician" && type !== "others" && <OverviewCard />}
      {type !== "lab_technician" && type !== "others" && (
        <div className="overview_page_upcoming_head">Upcoming Appointments</div>
      )}
      <UpcomingEvent data={[]} width="300px" flexOption="flex" />
      <PanelLineChart />
      <div className="overview_page_chart_flex">
        <PanelBarComponent />
        <div>
          <PatientSatisfication />
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;
