import { InputText } from "primereact/inputtext";
import React from "react";

interface InputProps {
  placeholder?: string;
  classNames?: string;
  label?: string;
  type?: string;
  value?: string | any;
  onChange?: Function;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  min?: string | number;
  onBlur?: Function;
  error?: string | boolean;
}

export default function TextInputComponent({
  placeholder,
  classNames,
  label,
  name,
  type = "text",
  value,
  onChange,
  disabled,
  required = false,
  onBlur,
  min,
  error,
}: InputProps) {
  const handleChange = (e: React.ChangeEvent) => {
    if (onChange) onChange(e);
  };
  const handleBlur = (e: React.ChangeEvent) => {
    if (onBlur) onBlur(e);
  };

  return (
    <div className="input__text__container full__width">
      <label>
        {label}
        {required && <span className="required__label">*</span>}
      </label>
      <InputText
        name={name}
        placeholder={placeholder}
        className={classNames}
        type={type}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        onBlur={handleBlur}
        min={min}
      />
      {error && <div className="formik_error">{error}</div>}
    </div>
  );
}
