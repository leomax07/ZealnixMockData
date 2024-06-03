import CloackImage from "../../Icon/clock.svg";
import "./timeset.scss";

interface TimeSetprops {
  fromTime?: String;
  toTime?: String;
  paddingValue?: string;
}
export default function TimeSet({
  fromTime,
  toTime,
  paddingValue,
}: TimeSetprops) {
  return (
    <div className="flexLine" style={{ padding: paddingValue }}>
      <img className="ImageClass" src={CloackImage} alt="clockImage" />
      <div className="fontText">Duty Time : </div>
      <div className="fontTextAM">
        {fromTime} -{toTime}{" "}
      </div>
    </div>
  );
}
