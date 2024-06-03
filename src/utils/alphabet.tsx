
interface Props {
  letter?:any,
  width? :string,
  height?:string,
  borderRadius?:string,
  fontSize?:string,
  border?:string,
  cursor?:string,

}

const colorCodes:any = {
  a: "rgb(66, 165, 245)",
  b: "rgb(38, 166, 154)",
  c: "rgb(236, 64, 122)",
  d: "rgb(141, 110, 99)",
  e: "rgb(141, 110, 99)",
  f: "rgb(255, 167, 38)",
  g: "rgb(141, 110, 99)",
  h: "rgb(66, 165, 245)",
  i: "rgb(38, 166, 154)",
  j: "rgb(236, 64, 122)",
  k: "rgb(255, 167, 38)",
  l: "rgb(255, 167, 38)",
  m: "rgb(66, 165, 245)",
  n: "rgb(38, 166, 154)",
  o: "rgb(236, 64, 122)",
  p: "rgb(255, 167, 38) ",
  q: "rgb(255, 167, 38)",
  r: "rgb(66, 165, 245)",
  s: "rgb(141, 110, 99)",
  t: "rgb(38, 166, 154)",
  u: "rgb(236, 64, 122)",
  v: "rgb(255, 167, 38)",
  w: "rgb(66, 165, 245)",
  x: "rgb(38, 166, 154)",
  y: "rgb(236, 64, 122)",
  z: "rgb(141, 110, 99)",
};

export default function Alphabet ({
  letter,
  width = "33px",
  height = "33px",
  borderRadius = "50%",
  fontSize = "14px",
  border = "unset",
  cursor="pointer"
}:Props) : JSX.Element  {

  const color = colorCodes[letter?.toLowerCase()] || "#000000";
  return (
    <div
      style={{
        backgroundColor: color,
        color: "#ffffff",
        width,
        height,
        borderRadius,
        border,
        cursor,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      }}
      className="avatar__name"
    >
      <span style={{ fontSize }}
      >{letter}</span>
    </div>
  );
};

