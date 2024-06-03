import React from "react";
import "./event.scss";

interface UpcomingEventCardprops {
  title: string;
  time: string;
  patientName: string;
  date: string;
  month: string;
  backgroundColorOption: string;
  cardWidth?: string;
}

export default function UpcomingEventCard({
  title,
  time,
  patientName,
  date,
  month,
  backgroundColorOption,
  cardWidth,
}: UpcomingEventCardprops) {
  return (
    <div className="upcoming_event_card_main_flex" style={{ width: cardWidth }}>
      <div
        className="upcoming_event_card_flex"
        style={{ borderLeft: `5px solid ${backgroundColorOption}` }}
      >
        <div className="upcoming_event_card_date">{date}</div>
        <div className="upcoming_event_card_month">{month}</div>
      </div>
      <div className="upcoming_event_card_text_flex">
        <div className="upcoming_event_card_title">{title}</div>
        <div className="upcoming_event_card_time">{time}</div>
        <div className="upcoming_event_card_name">Patient :{patientName}</div>
      </div>
    </div>
  );
}
