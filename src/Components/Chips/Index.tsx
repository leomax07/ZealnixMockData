import React from "react";
import { Chips } from "primereact/chips";

interface ChipsProps {
  className?: string;
  name?: string;
  label?: string;
  value?: string[] | undefined;
  onChange?: (args: any) => void;
}

export default function ChipsComponent({
  className,
  label,
  value,
  name,
  onChange,
}: ChipsProps) {
  return (
    <div className="input__text__container full__width">
      <label>{label}</label>
      <Chips
        className={className}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
