import { Checkbox } from "primereact/checkbox";

interface CheckboxProps {
  checked: boolean;
  disabled?: boolean;
  label: string;
  checkboxId: string;
  onChange?: (args: any) => void;
  value?: any;
  name?: string;
  error?: boolean | string;
}

function CheckboxComponent({
  checked,
  disabled,
  label,
  checkboxId,
  onChange,
  value,
  name,
  error,
}: CheckboxProps) {
  return (
    <div>
      <label htmlFor={checkboxId} className="checkbox__input__container">
        <Checkbox
          id={checkboxId}
          name={name}
          checked={checked}
          value={value}
          disabled={disabled}
          onChange={onChange}
        />
        <span>{label}</span>
      </label>
      {error && <div className="formik_error">{error}</div>}
    </div>
  );
}

export default CheckboxComponent;
