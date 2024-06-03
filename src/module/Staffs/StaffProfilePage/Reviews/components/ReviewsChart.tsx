import { useState, useEffect } from "react";
import star from "../../../../../assets/star.svg";

export default function ReviewsChart() {
  const [maxValue, setMaxValue] = useState<number>(0);
  useEffect(() => {
    setMaxValue(100);
  }, []);

  const dataset = [
    { value: 100, color: "#35B89F", label: 5 },
    { value: 80, color: "#DD81FE", label: 4 },
    { value: 40, color: "#35BFEF", label: 3 },
    { value: 30, color: "#F6BF40", label: 2 },
    { value: 50, color: "#F97A1D", label: 1 },
  ];
  return (
    <div className="reviews__chart__container">
      {dataset.map((item) => (
        <div key={item.value} className="each__ratings__container">
          <div className="left">
            <img src={star} alt="" className="star" />
            <div className="text">{item.label}</div>
          </div>
          <div className="right">
            <div className="lines__container">
              <div
                className="line"
                style={{
                  width: `${(((item.value / maxValue) * 100) / 100) * 145}px`,
                  backgroundColor: item.color,
                }}
              />
            </div>
            <div className="values">{item.value} K</div>
          </div>
        </div>
      ))}
    </div>
  );
}
