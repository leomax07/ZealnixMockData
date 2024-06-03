import { Outlet } from "react-router-dom";
import "./AssestsScreen.scss";
import TabsTableComponent from "../../Components/TabsTable/Tabtable";

export type TabOptions = {
	label: string;
	to: string;
	index: number;
};
interface AsstesScreenprops {
	tabOptions: TabOptions[];
}

function AssetsComponent({ tabOptions }: AsstesScreenprops) {
	return (
		<div className="page__container">
			<div className="tabClass">
				<TabsTableComponent
					options={tabOptions}
					enableList
					assetMaintenance
				/>
			</div>
			<Outlet />
		</div>
	);
}
export default AssetsComponent;
