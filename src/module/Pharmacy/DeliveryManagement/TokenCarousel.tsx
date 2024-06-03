import { ReactElement, useEffect, useState } from "react";
import { Carousel } from "primereact/carousel";
import moment from "moment";
import ButtonComponent from "../../../Components/Buttons/Index";
import { ProfileImageTemplate } from "../../../Components/DataTableTemplates/Index";

interface DataTypes {
  tokenId: string;
}

interface Props {
  tokens: DataTypes[];
}

export default function TokenCarousel({ tokens }: Props): ReactElement {
  // const [selected, setSelected] = useState(0);
  const [time, setTime] = useState("");
  /* const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		centerMode: true,
	}; */
  const startTime = () => {
    const today = new Date();
    const h = today.getHours();
    const m = today.getMinutes();
    const s = today.getSeconds();
    setTime(`${h} : ${m} : ${s.toFixed(0)}`);
  };

  useEffect(() => {
    const timerId = setInterval(startTime, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const itemsTemplate = (data: DataTypes) => (
    <div className="each__carousel__item">
      <p className="token__id__label">Token ID</p>
      <p className="token__id">{data.tokenId}</p>
      <div className="profile">
        <ProfileImageTemplate rowData={data} />
      </div>
    </div>
  );

  const getTodaysDate = () => moment().format("DD MMMM YYYY");

  return (
    <div className="token__carousel__conatainer">
      {/* <Slider {...settings}>
				{tokens.map((token, idx) => (
					<>
						<div className="each__carousel__item">
							<label className="token__id__label" htmlFor="">
								Token ID
							</label>
							<p className="token__id">{token.tokenId}</p>
							<div className="profile">
								<ProfileImageTemplate rowData={token} />
							</div>
						</div>
					</>
				))}
			</Slider> */}
      <div className="times__container">
        <p className="date">{getTodaysDate()}</p>
        <p className="time">{time}</p>
      </div>
      <p className="light__text">Currently Serving</p>
      <Carousel
        value={tokens}
        itemTemplate={itemsTemplate}
        numVisible={3}
        numScroll={1}
        showIndicators={false}
      />
      <div className="times__container buttons__container">
        <ButtonComponent label="Previous" type="outlined" />
        <ButtonComponent label="Call" />
        <ButtonComponent label="Next" type="outlined" />
      </div>
    </div>
  );
}
