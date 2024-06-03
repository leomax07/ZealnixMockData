import { Outlet } from "react-router-dom";
import { useState } from "react";
import TabComponent from "../../Components/Tab/tab";
import { LABORATORY_TABS } from "../../constants";

export type TabOptions = {
	label: string;
	to: string;
	index: number;
};

function LaboratoryScreen() {
	const [selectedTab, setSelectedTab] = useState(0);
	const tabOptions = LABORATORY_TABS;

	return (
		<div className="page__container laboratoryScreen__screen__container">
			<div className="laboratoryScreen__screen__header__container">
				<div className="laboratory__screen__tabs__container">
					<TabComponent
						taboptions={tabOptions}
						selectedTab={selectedTab}
						setSelectedTab={setSelectedTab}
					/>
				</div>
			</div>
			<div className="labs__table__container">
				<Outlet context={{ labId: LABORATORY_TABS[selectedTab].labId }} />
			</div>
		</div>
	);
}

export default LaboratoryScreen;
