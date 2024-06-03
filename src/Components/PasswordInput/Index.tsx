import { Password } from "primereact/password";
import React from "react";

interface PasswordProps {
  placeholder?: string;
  classNames?: string;
  label?: string;
  name?: string;
  value?: string;
  onChange?: Function;
}

export default function PasswordInputComponent({
  placeholder = "Password",
  classNames,
  label,
  value,
  name,
  onChange,
}: PasswordProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
  };
  return (
    <div className="input__text__container full__width">
      <label>{label} </label>
      <Password
        className={classNames}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={handleChange}
      />
    </div>
  );
}
