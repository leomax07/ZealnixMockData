import BadgeComponent from "../Badge/badge";
import BookButton from "../BookButton/bookbutton";
import Dots from "../Dots/dots";
import TimeSet from "../TimeSet/timeset";
import "./card.scss";

interface CardDataprops {
  image?: string;
  name?: string;
  id?: string;
  subTitle?: string;
}
export default function CardDesign({
  image,
  name,
  id,
  subTitle,
}: CardDataprops) {
  return (
    <div className="cardClass">
      <div className="ImgClass">
        <img src={image} alt="Avatar" width={75} height={75} />
      </div>
      <div className="flexClassCard">
        <div className="nameClass">{name}</div>
        <div className="idClass">{id}</div>
        <div className="dot" />
      </div>
      <div className="divCenter">
        <BadgeComponent title={subTitle} />
      </div>
      <TimeSet fromTime="9.00" toTime="6.00" paddingValue="10px" />
      <div className="flexClassCard">
        <BookButton title="Book Appointment" />
        <Dots />
      </div>
    </div>
  );
}
