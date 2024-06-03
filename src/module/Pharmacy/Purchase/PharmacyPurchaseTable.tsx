import { DataTable } from "primereact/datatable";
import { ProgressBar } from "primereact/progressbar";
import { Column } from "primereact/column";
import { useState } from "react";
import { RowType } from "../Inventory/PharmacyInventory";
import dots from "../../../Icon/dots.svg";
import ButtonComponent from "../../../Components/Buttons/Index";
import {
	PHARMACY_STOCK_DATA,
	ROWS_PER_PAGE,
	ROWS_PER_PAGE_OPTIONS,
} from "../../../constants";
import EyeIcon from "../../../assets/eye.svg";
import RightSideBar from "../../../Components/RightSidebar/Index";
import {
	ProfileImageTemplate,
	hotlinkTemplateHelper,
	paginatorTemplate,
	tableDateTemplate,
} from "../../../Components/DataTableTemplates/Index";
import SalesAndPurchaseDetails from "../Inventory/Sidebar/SaleAndPurchase";

export const inStockTemplateHelper = (row: RowType) => (
	<div className="in__stock__container">
		<p className="stock">{row.stock}</p>
		<div className="progress__part">
			<ProgressBar
				className={row?.inStock > 50 ? "green" : "yellow"}
				value={row.inStock}
			/>
		</div>
	</div>
);

function PharmacyPurchaseTable() {
	const [visible, setVisible] = useState(false);

	const categoryStyleHelper = (row: RowType) => (
		<p className="catrgory__table__style">{row.category}</p>
	);

	const actionTemplateHelper = () => (
		<div className="action__template__controller">
			<img
				src={dots}
				alt="dots"
			/>
		</div>
	);

	const statusTemplateHelper = (row: RowType) => (
		<div className="status__template__container">
			{row.status === "active" && <div className="active__status__badge" />}
			{row.status === "inactive" && <div className="inactive__status__badge" />}
			<p className="status">{row.status}</p>
		</div>
	);

	const viewTemplateHelper = () => (
		<div className="view__template__helper">
			<ButtonComponent
				label="View"
				type="outlined"
				onClick={() => setVisible(true)}
				image={EyeIcon}
			/>
		</div>
	);

	return (
		<div>
			<div className="table__container">
				<DataTable
					value={PHARMACY_STOCK_DATA}
					paginator
					rows={ROWS_PER_PAGE}
					rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
					paginatorTemplate={paginatorTemplate}
				>
					<Column selectionMode="multiple" />
					<Column
						header="DRUG NAME"
						body={ProfileImageTemplate}
						field="name"
					/>
					<Column
						header="TOKEN ID"
						body={(row) => hotlinkTemplateHelper(row.drugId)}
						field="drugId"
					/>
					<Column
						header="DRUG ID"
						body={(row) => hotlinkTemplateHelper(row.drugId)}
						field="drugId"
					/>
					<Column
						header="CATEGORY"
						body={categoryStyleHelper}
						field="category"
					/>
					<Column
						header="MANUFACTURER"
						field="manufacturer"
					/>
					<Column
						header="QUANTITY"
						field="quantity"
					/>
					<Column
						header="EXPIRY DATE"
						body={(row) => tableDateTemplate(row.date)}
						field="inStock"
					/>
					<Column
						header="UNIT PRICE"
						field="unitPrice"
					/>
					<Column
						header="PURCHASED ON"
						body={(row) => tableDateTemplate(row.date)}
						field="inStock"
					/>
					<Column
						header="STATUS"
						body={statusTemplateHelper}
						field="status"
					/>
					<Column body={viewTemplateHelper} />
					<Column body={actionTemplateHelper} />
				</DataTable>
				<RightSideBar
					body={<SalesAndPurchaseDetails />}
					setVisible={setVisible}
					visible={visible}
				/>
			</div>
		</div>
	);
}

export default PharmacyPurchaseTable;
