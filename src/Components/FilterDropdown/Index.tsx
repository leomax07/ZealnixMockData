import { Dropdown } from "primereact/dropdown";

interface DropdownProps {
	classNames?: string;
	items?: object[] | string[];
	placeholder?: string;
	label?: string;
	name?: string;
	handleChange?: any;
	optionLabel?: string;
	optionValue?: string;
	value?: string | number | object;
	disabled?: boolean;
	required?: boolean;
	onBlur?: Function;
	error?: boolean | string;
}

function FilterDropdown({
	classNames,
	items = [],
	placeholder = "select",
	label,
	name,
	handleChange,
	optionLabel,
	optionValue,
	value,
	disabled,
	required,
	onBlur,
	error,
}: DropdownProps) {
	const handleBlur = (e: React.ChangeEvent) => {
		if (onBlur) onBlur(e);
	};

	return (
		<div className="full__width dropdown__component__container">
			{label && (
				<label className="label">
					{label}
					{required && <span className="required__label">*</span>}
				</label>
			)}
			<Dropdown
				options={items}
				placeholder={placeholder}
				className={classNames}
				name={name}
				onChange={handleChange && handleChange}
				optionLabel={optionLabel}
				optionValue={optionValue}
				value={value}
				disabled={disabled}
				required={required}
				onBlur={handleBlur}
			/>
			{error && <div className="formik_error">{error}</div>}
		</div>
	);
}

export default FilterDropdown;
