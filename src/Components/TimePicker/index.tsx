import { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import moment from "moment";

interface Props {
  label?: string;
  showIcon?: boolean;
  name?: string;
  value?: string | number;
  onChange?: Function;
  error?: boolean | string;
}

function TimePicker({ label, showIcon = false, name, onChange, value, error }: Props) {
  const [date, setDate] = useState<string | Date>();

  useEffect(() => {
    if (typeof value === "number") {
      const time = moment()
        .startOf("D")
        .set({ minutes: value })
        .toLocaleString();
      setDate(new Date(time));
    } else {
      setDate(new Date(value || ""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: any) => {
    if (onChange) onChange(event);
    setDate(new Date(event.value));
  };

  return (
    <div className="full__width time__picker__container">
      <label>{label}</label>
      <Calendar
        value={date}
        onChange={handleChange}
        showIcon={showIcon}
        timeOnly
        name={name}
      />
      {error && <div>{error}</div>}
    </div>
  );
}

export default TimePicker;
