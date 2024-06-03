import CalImg from "../../Icon/CalImg.svg";
import "./bookbutton.scss";

interface Buttonprops {
  title?: String;
}
export default function BookButton({ title }: Buttonprops) {
  return (
    <div className="buttonClass">
      <img src={CalImg} alt="CalImg" />
      <div className="textClassbook">{title}</div>
    </div>
  );
}
