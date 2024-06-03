import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import calenderIcon from "../../assets/calenderIcon.svg";

interface DatePickerProps {
  label?: string;
  showIcon?: boolean;
  name?: string;
  onChange?: Function;
  value?: string | Date;
  showTime?: boolean;
  hourFormat?: "12" | "24";
  timeOnly?: boolean;
  required?: boolean;
  onBlur?: Function | undefined;
  error?: string | boolean;
}
function DatePickerComponent({
  label,
  showIcon,
  onChange,
  value,
  name,
  showTime,
  hourFormat = "24",
  timeOnly,
  required = false,
  onBlur,
  error,
}: DatePickerProps) {
  const handleChange = (e: CalendarChangeEvent) => {
    if (onChange) onChange(e);
  };
  const handleBlur = (e: React.ChangeEvent) => {
    if (onBlur) onBlur(e);
  };

  return (
    <div className="date__picker__component">
      {label && (
        <label className="label">
          {label}
          {required && <span className="required__label">*</span>}
        </label>
      )}
      <div className="calande__input__icon__container full__width">
        <Calendar
          showIcon={showIcon}
          name={name}
          onChange={handleChange}
          value={value}
          showTime={showTime}
          hourFormat={hourFormat || "24"}
          timeOnly={timeOnly}
          onBlur={handleBlur}
        />
        <img src={calenderIcon} alt="calendarIcon" className="calendar__icon" />
        {error && <div className="formik_error">{error}</div>}
      </div>
    </div>
  );
}

export default DatePickerComponent;
