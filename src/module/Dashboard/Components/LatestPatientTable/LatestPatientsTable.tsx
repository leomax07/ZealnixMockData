import moment from "moment";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {LatestPatients} from "../../mock"
import {
	tableDateTemplate,
	paginatorTemplate,
} from "../../../../Components/DataTableTemplates/Index";
import {
	ROWS_PER_PAGE_OPTIONS,
	SORT_BY_CREATEDAT_DESC,
} from "../../../../constants";
import { AppDispatch, RootState } from "../../../../redux/store";
import { getLatestPatientList } from "../../store/dashboardscreenMiddleware";

function LatestPatientsTable() {
	const { latestPatientList } = useSelector<
		RootState,
		RootState["dashboardReducers"]
	>((state) => state.dashboardReducers);
	const dispatch = useDispatch<AppDispatch>();

	const fetchData = async () => {
		const payload = {
			filter: {
				order: SORT_BY_CREATEDAT_DESC,
			},
		};
		await dispatch(getLatestPatientList(payload));
	};

	const calculateAge = (date: string | undefined) =>
		!date ? "" : moment(new Date(date)).format("DD-MM-YYYY");

	const tableStatusTemplate = (status: string) => (
		<p className="to__camel__case">{status.replace("_", " ")}</p>
	);

	const tableNameTemplate = (name: string) => (
		<p className="blue__text to__camel__case">{name}</p>
	);

	useEffect(() => {
		fetchData();
	}, []);
	return (
		<div className="latest__patient__table__container card">
			<div className="header">
				<p>Latest Patients</p>
			</div>
			<DataTable
				value={LatestPatients}
				paginator
				rows={5}
				rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
				paginatorTemplate={paginatorTemplate}
			>
				<Column
					header="ID"
					field="id"
				/>
				<Column
					header="DATE"
					field="date"
					body={(row) => tableDateTemplate(row.createdAt)}
				/>
				<Column
					header="NAME"
					field="name"
					body={(row) => tableNameTemplate(row.name)}
				/>
				<Column
					header="AGE"
					field="age"
					body={(row) => calculateAge(row.dateOfBirth)}
				/>
				<Column
					header="GENDER"
					field="gender"
				/>
				<Column
					header="STATUS"
					field="status"
					body={(row) => tableStatusTemplate(row.status)}
				/>
			</DataTable>
		</div>
	);
}

export default LatestPatientsTable;
