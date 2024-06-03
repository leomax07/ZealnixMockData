import { TagInput } from "evergreen-ui";
import { ReactElement, useState } from "react";

interface Props {
  label?: string;
  subText?: string;
  className?: string;
}

export default function TagInputComponent({
  label,
  subText,
  className,
}: Props): ReactElement {
  const [values, setValues] = useState([""]);
  return (
    <div className={`${`tag__input__container ${className}`}`}>
      <label>{label}</label>
      {subText && <div className="info__text">{subText}</div>}
      <TagInput
        inputProps={{ placeholder: "Add trees..." }}
        className={className}
        values={values}
        tagSubmitKey="space"
        onChange={(value) => {
          setValues(value);
        }}
      />
    </div>
  );
}
