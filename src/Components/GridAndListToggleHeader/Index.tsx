import React, { MouseEventHandler, useState } from "react";
import ButtonComponent from "../Buttons/Index";
import SearchInputComponent from "../SearchInput/searchInput";
import ListImg from "../../Icon/list.svg";
import GridImg from "../../Icon/grid.svg";
import violetListImg from "../../Icon/violetList.svg";
import violetGridImg from "../../Icon/violetGrid.svg";
import DatePickerComponent from "../DatePicker/Index";
import DateTab from "../Tab/DateTab";

interface GridAndLayoutPropTypes {
	changeTab?: Function;
	handleAddNewClick?: MouseEventHandler;
	showDatePicker?: boolean;
	showDatesTab?: boolean;
	hideGridToggle?: boolean;
	searchBarClass?: string;
	buttonText?: string;
	setSearch?: Function;
	selectedDay?: string;
	setSelectedDay?: Function;
	selectedDate?: any;
	setSelectedDate?: Function;
	hidePrimaryButton?: boolean;
}

function GridAndListToggleHeader({
	changeTab,
	handleAddNewClick,
	showDatePicker = false,
	showDatesTab = false,
	hideGridToggle = false,
	searchBarClass,
	buttonText = "Add New",
	setSearch,
	selectedDay,
	setSelectedDay,
	selectedDate,
	setSelectedDate,
	hidePrimaryButton = false,
}: GridAndLayoutPropTypes) {
	const [gridScreen, setgridScreen] = useState(false);
	const [listScreen, setlistScreen] = useState(true);
	const [searchText, setSearchText] = useState("");

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
		if (setSearch) setSearch(e.target.value);
	};

	const listfunction = () => {
		setlistScreen(true);
		setgridScreen(false);
		if (changeTab) changeTab("list");
	};

	const gridfunction = () => {
		setlistScreen(false);
		setgridScreen(true);
		if (changeTab) changeTab("grid");
	};

	const handleDaySelection = (day: string) => {
		if (setSelectedDay) setSelectedDay(day);
	};

	const handleDateSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (setSelectedDate) setSelectedDate(e.target.value);
	};

	return (
		<div className="grid__and__toggle__container">
			<div className="left" />
			<div className="right">
				<SearchInputComponent
					className={searchBarClass}
					value={searchText}
					onChange={handleSearch}
				/>
				{!hideGridToggle && (
					<div className="flex">
						<div
							className="gridView"
							onClick={() => gridfunction()}
						>
							<img
								src={gridScreen ? violetGridImg : GridImg}
								alt="GridImg"
							/>
						</div>
						<div
							className="listView"
							onClick={() => listfunction()}
						>
							<img
								src={listScreen ? violetListImg : ListImg}
								alt="ListImg"
							/>
						</div>
					</div>
				)}
				{showDatesTab && (
					<DateTab
						selectedDay={selectedDay}
						onChange={handleDaySelection}
						selectedDate={selectedDate}
						setSelectedDate={setSelectedDate}
					/>
				)}
				{showDatePicker && (
					<DatePickerComponent
						value={selectedDate}
						onChange={handleDateSelection}
					/>
				)}
				{!hidePrimaryButton && (
					<ButtonComponent
						label={buttonText}
						onClick={handleAddNewClick}
					/>
				)}
			</div>
		</div>
	);
}

export default GridAndListToggleHeader;
