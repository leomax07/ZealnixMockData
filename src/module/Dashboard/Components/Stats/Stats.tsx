import arrow from "../../../../assets/arrows-diagonal.svg";
import greenArrow from "../../../../assets/arrow-up.svg";
import redArrow from "../../../../assets/arrow-down.svg";

interface Props {
	currentWeekCount: number;
	lastWeekCount: number;
	title: string;
}

function Stats({ currentWeekCount, lastWeekCount, title }: Props) {
	const getDiffPercentage = () =>
		(currentWeekCount && lastWeekCount) === 0
			? 0
			: Math.round(
					100 *
						((currentWeekCount - lastWeekCount) /
							(currentWeekCount + lastWeekCount / 2))
			  );

	return (
		<div className="stats__container">
			<div className="title__container">
				<p className="title">{title}</p>
				<img
					src={arrow}
					alt="arrow"
				/>
			</div>
			<div className="numbers__container">
				<h1 className="number">{currentWeekCount}</h1>
				<p
					className={`status ${getDiffPercentage() > 0 ? "greenBg" : "redBg"}`}
				>
					{getDiffPercentage() > 0 ? (
						<img
							src={greenArrow}
							alt="greenArrow"
						/>
					) : (
						<img
							src={redArrow}
							alt="redArrow"
						/>
					)}
					{getDiffPercentage()}%
				</p>
			</div>
			<div className="light__text">Last week {lastWeekCount}</div>
		</div>
	);
}

export default Stats;
