import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { Rating } from "@mui/material";
import star from "../../../../../assets/star.svg";
import { DotsTemplate, ProfileImageTemplate, TimeTemplate } from "../../../../../Components/DataTableTemplates/Index";

interface RowsType {
  rating: number;
}

export const ratingsTemplate = (rows: RowsType) => (
  <div className="flex align__center">
    <p>{rows.rating}</p>
    <Rating readOnly value={rows.rating} precision={0.1} size="small" />
  </div>
);

function ReviewsTable() {
  const [products] = useState<any>([
    {
      name: "Product",
      profileUrl: star,
      rating: 4.2,
      review:
        "I had I was very sad this day. There were friendly people at the bar that engaged with me. Interactions with people was very well needed. I enjoyed a great Long Island ice tea,some tasty vegetarian nachos, and sat by the water",
    },
  ]);
  const [selectedData, setSelectedData] = useState<any>();

  return (
    <div>
      <div className="card">
        <DataTable
          value={products}
          responsiveLayout="scroll"
          selection={selectedData}
          onSelectionChange={(e) => setSelectedData(e.value)}
        >
          <Column selectionMode="multiple" style={{ maxWidth: "1rem" }} />
          <Column
            body={ProfileImageTemplate}
            header="NAME"
            style={{ width: "122px" }}
          />
          <Column
            body={ratingsTemplate}
            style={{ width: "100px" }}
            header="RATING"
          />
          <Column
            field="review"
            header="REVIEW"
            headerClassName="employeeIdClass"
          />
          <Column
            body={TimeTemplate}
            style={{ width: "122px" }}
            header="DATE AND TIME"
          />

          <Column body={DotsTemplate} />
        </DataTable>
      </div>
    </div>
  );
}

export default ReviewsTable;
