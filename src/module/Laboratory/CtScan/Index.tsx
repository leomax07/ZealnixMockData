import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import GridAndListToggleHeader from "../../../Components/GridAndListToggleHeader/Index";
import AddNewReport from "../Components/AddNewReport";
import LabReportTables from "../Components/LabReportTables";

function CTScanIndex() {
	const [view, setView] = useState("list");
	const [showAddNew, setShowAddNew] = useState(false);
	const [search, setSearch] = useState("");
	const { labId }: any = useOutletContext();

	// remove this once view is used
	console.log(view);

	const toggleAddNew = () => {
		setShowAddNew((prev) => !prev);
	};
	return (
		<div className="xray__index__contaier">
			<GridAndListToggleHeader
				changeTab={setView}
				handleAddNewClick={toggleAddNew}
				setSearch={setSearch}
			/>
			<br />
			<LabReportTables
				search={search}
				labId={labId}
			/>
			<AddNewReport
				visible={showAddNew}
				setVisible={setShowAddNew}
				labId={labId}
			/>
		</div>
	);
}

export default CTScanIndex;
