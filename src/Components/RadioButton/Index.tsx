import { RadioButton } from "primereact/radiobutton";

interface Props {
  setValue: Function;
  value: string;
  name: string;
  checked: boolean;
  label: string;
  disabled?: boolean;
  required?: boolean;
}

function RadioButtonComponent({
  setValue,
  value,
  name,
  checked,
  label,
  disabled,
  required,
}: Props) {
  return (
    <div className="radio__container">
      <div className="flex align-items-center">
        <RadioButton
          inputId="ingredient1"
          name={name}
          value={value}
          onChange={(e) => setValue(e.value)}
          checked={checked}
          disabled={disabled}
          required={required}
        />
        <label htmlFor="ingredient1" className="ml-2">
          {label}
        </label>
      </div>
    </div>
  );
}

export default RadioButtonComponent;
