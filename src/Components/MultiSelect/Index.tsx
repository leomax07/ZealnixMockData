import { MultiSelect } from "primereact/multiselect";

interface MultiSelectProps {
  classNames?: string;
  items?: object[] | string[];
  placeholder?: string;
  label?: string;
  name?: string;
  handleChange?: any;
  optionLabel?: string;
  optionValue?: string;
  value?: string | object;
  filter?: boolean;
  required?: boolean;
  onBlur?: Function | undefined;
}

function MultiSelectDropdown({
  classNames,
  items = [],
  placeholder = "select",
  label,
  name,
  handleChange,
  optionLabel,
  optionValue,
  value,
  filter,
  required,
  onBlur,
}: MultiSelectProps) {
  const handleBlur = (e: React.ChangeEvent) => {
    if (onBlur) onBlur(e);
  };
  return (
    <div className="full__width dropdown__component__container">
      <label className="label">
        {label}
        {required && <span className="required__label">*</span>}
      </label>
      <MultiSelect
        options={items}
        placeholder={placeholder}
        className={classNames}
        name={name}
        onChange={handleChange && handleChange}
        optionLabel={optionLabel}
        optionValue={optionValue}
        value={value}
        filter={filter}
        required={required}
        onBlur={handleBlur}
      />
    </div>
  );
}

export default MultiSelectDropdown;
