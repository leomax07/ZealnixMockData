import { SearchInput } from "evergreen-ui";
import React from "react";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: Function;
}

export default function SearchInputComponent({
  placeholder,
  className,
  value,
  onChange,
}: SearchInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
  };
  return (
    <SearchInput
      className={className}
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
    />
  );
}
