import { ProgressBar } from "primereact/progressbar";
import pharmacySample from "../../../assets/pharmacy-sample.png";

interface ListType {
  name: string;
  profileUrl: string;
  drugId: string;
  status: string;
  category: string;
  manufacturer: string;
  stock: number;
  inStock: number;
}
interface PropType {
  list?: ListType[];
}
function PharmacyGridList({ list }: PropType) {
  return (
    <div className="grid__page__container">
      {list?.map((stockItem) => (
        <div className="card">
          <div className="imahe__container">
            <img
              src={stockItem.profileUrl || pharmacySample}
              alt="stockImage"
              className="image"
            />
          </div>
          <div className="details__container">
            <p className="name">
              {stockItem.name}
              <span className="drug__id light__grey__text">
                {stockItem.drugId}
              </span>
              <span
                className={`status__badge ${
                  stockItem?.status === "active" ? "green__bg" : "blue__bg"
                }`}
              />
            </p>
            <div className="second__line">
              <div className="category">{stockItem.category}</div>
              <div className="manufacturer">{stockItem.manufacturer}</div>
            </div>
            <div className="third__line">
              <p className="instock__text light__text">In stock</p>
              <div className="progress__container">
                <span className="light__text">{stockItem.stock}</span>
                <ProgressBar
                  className={stockItem?.inStock > 50 ? "green" : "yellow"}
                  value={stockItem.inStock}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PharmacyGridList;
