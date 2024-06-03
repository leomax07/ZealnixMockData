/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState, useRef } from "react";
import { Carousel } from "primereact/carousel";
import AvatarWithNameAndRole from "../../../Components/AvatarWithNameAndRole/Index";
import BlueEagle from "../../../assets/sample.jpeg";
import ButtonComponent from "../../../Components/Buttons/Index";
import TabComponent from "../../../Components/Tab/tab";
import DownloadIcon from "../../../assets/downloadIcon.svg";
import NotesComponent from "../../../Components/Notes/Index";

interface Props {
	setVisible: Function;
	reportData: any;
}

function ViewReport({ setVisible, reportData }: Props) {
	const [selectedTab, setSelectedTab] = useState(0);

	useEffect(() => {}, [reportData]);
	const reportRef: any = useRef();
	const tabOptions = [{ label: "Report", to: "", index: 0 }];

	const reportImagesTemplate = (img: any) => (
		<img
			className="carousel__image__size"
			src={img}
			alt="report"
		/>
	);

	function reportDocument() {
		const checkIsImage = reportData.reportFileUrl.filter((img: string) => {
			const isImage: any = img.split(".").at(-1);
			if (["png", "jpg", "jpeg"].includes(isImage?.toLowerCase())) return img;
			return "";
		});

		if (checkIsImage?.length > 0) {
			return (
				<Carousel
					value={checkIsImage}
					numVisible={1}
					numScroll={1}
					itemTemplate={reportImagesTemplate}
				/>
			);
		}
		return "";
	}

	const notes = [reportData?.notes];

	const handleReport = () => {
		reportData.reportFileUrl.forEach((url: any, i: number) => {
			setTimeout(() => {
				reportRef.current.href = url;
				reportRef.current.click();
			}, i * 500);
		});
	};

	return (
		<div className="view__report__container">
			<div className="view__report__header">
				<div className="left">
					<AvatarWithNameAndRole profilePic={BlueEagle} />
					<div className="details__container">
						<p className="name">
							{reportData?.patient?.name}{" "}
							<span className="light__grey__text blue__text">
								#{reportData?.patientId?.substring(0, 5)}
							</span>
						</p>
						<span className="table__assets__category">
							{reportData?.department?.name}
						</span>{" "}
					</div>
				</div>
				<div className="right">
					<ButtonComponent
						label="Cancel"
						type="outlined"
						onClick={() => setVisible()}
					/>
				</div>
			</div>
			<div className="view__report__sub__header">
				<div className="each__details">
					<div className="title">Lab Technician</div>
					<div className="value">
						<div className="image__container">
							<img
								src={BlueEagle}
								alt="profileImage"
							/>
						</div>
						&nbsp;
						<p className="name">{reportData?.labTechnician?.name}</p>
					</div>
				</div>
				<div className="each__details">
					<div className="title">Doctor</div>
					{/* <OverlapAvatar users={doctors} /> */}
					<div className="value">{reportData?.headDoctor?.name}</div>
				</div>
				<div className="each__details">
					<div className="title">Illness</div>
					<div className="value">{reportData?.illness}</div>
				</div>
			</div>
			<div className="view__report__body">
				<div className="tabs__container">
					<TabComponent
						taboptions={tabOptions}
						selectedTab={selectedTab}
						setSelectedTab={setSelectedTab}
					/>
				</div>
				<div className="view__report__body__header__container flex space__between align__center">
					<p className="header">Scan Report</p>
					<ButtonComponent
						label="Report"
						image={DownloadIcon}
						onClick={handleReport}
					/>
				</div>
				<a ref={reportRef} />
				<div className="view__report__body__carousel__container">
					{reportDocument()}
				</div>
				<div className="view__report__notes__container">
					<NotesComponent
						notes={notes}
						date="26/06/2023"
					/>
				</div>
				{/* <div className="view__report__scan__details__container">
          <div className="header">Scan Details</div>
          {scanDetails.map((scanDetails) => (
            <div className="scan__detail__container">
              <p className="title">{scanDetails.title}</p>
              <p className="value">{scanDetails.value}</p>
            </div>
          ))}
        </div> */}
			</div>
		</div>
	);
}

export default ViewReport;
