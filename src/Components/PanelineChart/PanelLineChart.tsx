import GroupMenuComponent from "../GroupMenu/Groupmenu";
import LineGraphComponent from "../lineGraph/LineGraphComponent";
import dots from "../../Icon/dots.svg";
import "./PanelLineChart.scss";

const menuItemsLine = [
  { label: "Today", value: "today" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
];

function PanelLineChart() {
  return (
    <div className="panel_line_chart_head">
      <div className="panel_line_chart_body">
        <div className="panel_line_chart_box_flex">
          <div className="panel_line_chart_patient_text">
            Patient Statistics
            <div className="panel_line_chart_flex">
              <div className="panel_line_chart_count">12,786</div>
              <div className="panel_line_chart_percent">+20%</div>
            </div>
          </div>
          <div className="panel_line_chart_tab_dot_flex">
            <div className="panel_line_chart_tab">
              <GroupMenuComponent labelValueObject={menuItemsLine} />
            </div>
            <div className="panel_line_chart_dot">
              <img src={dots} alt="dotsImg" />
            </div>
          </div>
        </div>
        <LineGraphComponent />
      </div>
    </div>
  );
}

export default PanelLineChart;
