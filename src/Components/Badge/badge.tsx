import "./badge.scss";

interface BadgeComponentprops {
  title?: String;
}
export default function BadgeComponent({ title }: BadgeComponentprops) {
  return (
    <div>
      <span className="Title">{title}</span>
    </div>
  );
}
