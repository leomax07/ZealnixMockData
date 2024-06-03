import ButtonComponent from "../../../../Components/Buttons/Index";
import FilterDropdown from "../../../../Components/FilterDropdown/Index";
import SearchInputComponent from "../../../../Components/SearchInput/searchInput";
import ClipImage from "../../../../Icon/clipboard.svg";
import ReviewsTable from "./components/ReviewsTable";
import ReviewsToppart from "./ReviewsToppart";

function Reviews() {
  return (
    <div className="reviews__component__container">
      <div className="top__part">
        <ReviewsToppart />
      </div>
      <div className="review__component__header__container">
        <div className="left">
          <p className="header dark__grey__color">Recent Reviews</p>
        </div>
        <div className="right">
          <SearchInputComponent placeholder="Search" />
          <div className="filter__dropdown">
            <FilterDropdown />
          </div>
          <div className="buttons__container">
            <ButtonComponent image={ClipImage} label="Export" />
          </div>
        </div>
      </div>
      <div className="reviews__body">
        <ReviewsTable />
      </div>
    </div>
  );
}

export default Reviews;
