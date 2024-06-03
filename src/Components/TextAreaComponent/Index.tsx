import { InputTextarea } from "primereact/inputtextarea";

interface Props {
  label?: string;
  cols?: number;
  subText?: string;
  inputClassName?: string;
  name?: string;
  value?: string;
  onChange?: (arg: any) => void;
}

function TextAreaComponent({
  label,
  cols,
  subText,
  name,
  inputClassName,
  value,
  onChange,
}: Props) {
  return (
    <div className="input__text__container full__width">
      <label>{label}</label>
      <div className="sub__title">{subText}</div>
      <InputTextarea
        cols={cols}
        className={inputClassName}
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default TextAreaComponent;
