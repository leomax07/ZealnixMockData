import { useNavigate } from "react-router-dom";
import CardDesign from "../Card/card";
import "./doctorcard.scss";
import data from "./mock";

function DoctorProfileCard() {
  const navigate = useNavigate();

  const handleClick = (staffID: String) => {
    navigate(`/staffs/${staffID}`);
  };

  return (
    <div className="cards">
      <ul>
        {data.map((item) => (
          <li className="cards__item">
            <div onClick={() => handleClick(item.id)}>
              <CardDesign
                image={item.Image}
                name={item.name}
                id={item.name}
                subTitle={item.subTitle}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorProfileCard;
