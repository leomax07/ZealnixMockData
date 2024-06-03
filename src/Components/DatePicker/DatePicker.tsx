import React, { useState } from "react";
import { Calendar } from "primereact/calendar";

function DatePickerComponent() {
  const [date, setDate] = useState<any>();

  return (
    <div className="card flex justify-content-center">
      <Calendar
        value={date}
        onChange={(event) => setDate(event.value)}
        showIcon
      />
    </div>
  );
}

export default DatePickerComponent;
