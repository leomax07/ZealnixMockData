/* eslint-disable no-nested-ternary */
import { Button } from "primereact/button";
import { MouseEventHandler } from "react";

interface ButtonProps {
  label: string;
  type?: string;
  image?: any;
  classNames?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler;
}
function ButtonComponent({
  label = "click",
  type = "primary",
  classNames,
  disabled = false,
  onClick,
  image,
}: ButtonProps) {
  return (
    <div
      className={`button__component__container  ${
        type === "outlined" ? "outlined__container" : ""
      }`}
    >
      <Button
        label={image ? "" : label}
        className={` cursor-pointer ${classNames} ${
          type === "primary"
            ? " primary__button"
            : type === "outlined"
            ? "outlined"
            : ""
        }`}
        disabled={disabled}
        onClick={onClick}
      >
        {image && <img src={image} alt="icons" className="button__image" />}
        {image && <label> {label}</label>}
      </Button>
    </div>
  );
}

export default ButtonComponent;
