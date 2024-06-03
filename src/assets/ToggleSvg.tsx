interface Props {
  color?: string;
}
function ToggleSvg({ color }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="10"
      fill="none"
      viewBox="0 0 16 10"
    >
      <path
        fill={color || "#474D66"}
        fillRule="evenodd"
        d="M11 8.5H5a3.5 3.5 0 110-7h6a3.5 3.5 0 110 7zM11 0a5 5 0 110 10H5A5 5 0 115 0h6zM3 5a2 2 0 104 0 2 2 0 00-4 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default ToggleSvg;
