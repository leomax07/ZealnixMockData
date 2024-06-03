import { Rating } from "@mui/material";
import FilterDropdown from "../../../../Components/FilterDropdown/Index";
import arrow from "../../../../assets/arrows-diagonal.svg";
import downPinkArrow from "../../../../assets/downPinkArrow.svg";
import ReviewsChart from "./components/ReviewsChart";

function ReviewsToppart() {
  return (
    <div className="reviews__toppart__container">
      <div className="header flex space__between">
        <div className="left dark__grey__color">Reviews</div>
        <div className="right">
          <FilterDropdown />
        </div>
      </div>
      <div className="body flex">
        <div className="card">
          <div className="title__container">
            <p className="left">Total Reviews</p>
            <img src={arrow} alt="resize" />
          </div>
          <div className="body__container">
            <p className="title">502</p>
            <div className="growth__container">
              <img src={downPinkArrow} alt="downPinkArrow" />
              56%
            </div>
          </div>
        </div>
        <div className="seperator" />
        <div className="card">
          <div className="title__container">
            <p className="left">Average Rating</p>
            <img src={arrow} alt="resize" />
          </div>
          <div className="body__container">
            <p className="title">4.2</p>
            <Rating readOnly value={4.2} precision={0.1} />
          </div>
        </div>
        <div className="seperator" />
        <div className="card">
          <ReviewsChart />
        </div>
      </div>
    </div>
  );
}

export default ReviewsToppart;
