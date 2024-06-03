import "./upcomingevent.scss";
import moment from "moment";
import UpcomingEventCard from "../events/event";

interface UpcomingEventProps {
  width?: string;
  flexOption?: string;
  title?: string;
  subTitle?: string;
  cardHeight?: string;
  data: any[];
}
function UpcomingEvent({
  title,
  subTitle,
  width,
  flexOption,
  cardHeight,
  data,
}: UpcomingEventProps) {
  const getTimeString = (minutes: number) =>
    `${moment().startOf("day").add({ minutes }).format("hh:mm a")}`;

  const getDate = (date: string) => moment(date).format("DD");

  const getMonth = (date: string) => moment(date).format("MMM");

  return (
    <div className="upcoming_event_head">
      <div className="upcoming_event_text">{title}</div>
      <div className="upcoming_event_month">{subTitle}</div>
      <div
        className="upcoming_event_scroll"
        style={{ display: flexOption, height: cardHeight }}
      >
        {data.map((item) => (
          <div>
            <UpcomingEventCard
              title={item.title}
              time={getTimeString(
                item.appointmentSchedule.appointmentRangeStart,
              )}
              patientName={item?.patient?.name}
              date={getDate(item.appointmentDate)}
              month={getMonth(item.month)}
              backgroundColorOption="green"
              cardWidth={width}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingEvent;
