import Group from "../../Icon/Group.svg";
import BarGraphComponent from "../BarGraph/BarGraphComponent";
import GroupMenuComponent from "../GroupMenu/Groupmenu";
import dots from "../../Icon/dots.svg";
import "./PanelBar.scss";

const menuItemsBar = [
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "This Year", value: "year" },
];

function PanelBarComponent() {
  return (
    <div className="panel_bar_head">
      <div className="panel_bar_body">
        <div className="panel_bar_flex_box">
          <div className="panel_bar_flex">
            <div className="panel_bar_text">Time Spent On Duty</div>
            <div className="panel_bar_circle">
              <img src={Group} alt="Img" />
            </div>
          </div>
          <div className="panel_bar_tab_dot_flex">
            <div className="panel_bar_tab">
              <GroupMenuComponent labelValueObject={menuItemsBar} />
            </div>
            <div className="panel_bar_chart_dot">
              <img src={dots} alt="dotsImg" />
            </div>
          </div>
        </div>
        <BarGraphComponent
          BarchartLabelsX={[
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednessday",
            "Thursday",
            "Friday",
            "Saturday",
          ]}
          BarchartLabelsY={[
            400, 700, 200, 900, 300, 800, 750, 550, 200, 1000, 400,
          ]}
        />
      </div>
    </div>
  );
}

export default PanelBarComponent;
