interface Props {
  color: string;
  classNames: string;
}
function EditIcon({ color, classNames }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill={color || "none"}
      viewBox="0 0 14 14"
    >
      <path
        className={classNames}
        fill={color || "#357DEA"}
        d="M8.545 4.765l.69.69L2.44 12.25h-.69v-.69l6.795-6.795zm2.7-4.515a.75.75 0 00-.525.218L9.347 1.84l2.813 2.813 1.373-1.373a.747.747 0 000-1.057L11.777.468a.736.736 0 00-.533-.218zm-2.7 2.393L.25 10.937v2.813h2.813l8.294-8.295-2.812-2.813z"
      />
    </svg>
  );
}

export default EditIcon;
