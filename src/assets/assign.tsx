type Props = {
  width?: number;
  height?: number;
  color: string;
};
function AssignIcon({ width, height, color }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 18}
      height={height ?? 18}
      fill="none"
    >
      <g fill={color || "#474D66"} clipPath="url(#assign_svg__a)">
        <path d="M9 8.5a3.73 3.73 0 1 0 .01-7.46A3.73 3.73 0 0 0 9 8.5Zm0-6.465a2.73 2.73 0 1 1 .01 5.46A2.73 2.73 0 0 1 9 2.035ZM3 15.945v-3.06a8.065 8.065 0 0 1 6-2.5 8.304 8.304 0 0 1 4.355 1.165l.675-.755A9.265 9.265 0 0 0 9 9.37a8.85 8.85 0 0 0-6.895 3.03.5.5 0 0 0-.105.3v3.245A1.03 1.03 0 0 0 3 17h6.195l-.95-1L3 15.945ZM15 15.945V16h-1.575l-.9 1H15a1.03 1.03 0 0 0 1-1.035V13.1l-1 1.115v1.73Z" />
        <path d="M17.38 9.31a.5.5 0 0 0-.705.04l-5.81 6.5-2.6-2.795A.5.5 0 0 0 7.56 13a.5.5 0 0 0-.03.71l3.345 3.6L17.42 10a.5.5 0 0 0-.04-.69Z" />
      </g>
      <defs>
        <clipPath id="assign_svg__a">
          <path fill="#fff" d="M0 0h18v18H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
export default AssignIcon;
