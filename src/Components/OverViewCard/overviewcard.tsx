import "./overviewcard.scss";
import overviewData from "./mockoverview";

function OverviewCard() {
  return (
    <div className="over_card_main_flex">
      {overviewData.map((item: any) => (
        <div className="overview_card_head">
          <div className="overview_card_body">
            <div className="overview_card_flex">
              <div className="overview_card_img">
                <img src={item.image} alt="over" />
              </div>
              <div className="overview_card_sub_flex">
                <div className="overview_card_title">{item.title}</div>
                <div className="overview_card_number_count_flex">
                  <div className="overview_card_number">{item.count}</div>
                  <div className="overview_card_percent">{item.percent}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OverviewCard;
