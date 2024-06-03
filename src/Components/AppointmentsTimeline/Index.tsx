import moment from "moment";
import { useEffect, useRef } from "react";
import { HOURS_OF_DAY } from "../../constants";
import profileImagePlaceholder from "../../Icon/profile.svg";

interface Booking {
  id: number;
  title: string;
  appointmentStart: string | any;
  appointmentEnd: string | any;
  appointmentRangeStart: string | any;
  appointmentRangeEnd: string | any;
  regularSlot: number;
  regularAppointments: number;
  emergencySlot: number;
  emergencyAppointments: number;
  videoAppointments: number;
  videoSlot: number;
  doctorId: string;
}

interface DoctorProfile {
  name: string;
  avaliableHours?: number;
  profileImage: string | undefined;
}

interface BookedSlotProps {
  item: Booking;
  currentHour: number;
  setSelectedSlotId: Function;
  setSelectedDoctorId: Function;
}

interface Props {
  appointmentsData: any[];
  currentDate: string;
  setSelectedSlotId: Function;
  setSelectedDoctorId: Function;
}

const hoursOfDay = HOURS_OF_DAY;

function DoctorProfileIcon({
  name,
  avaliableHours = 0,
  profileImage,
}: DoctorProfile) {
  return (
    <div className="profile__container">
      <div className="image__container">
        <img src={profileImage || profileImagePlaceholder} alt="profile" />
      </div>
      <div className="details">
        <p className="name">{name || "name"}</p>
        <p className="available__hours">
          Available:
          {avaliableHours}
          hrs
        </p>
      </div>
    </div>
  );
}

function BookedSlotHelper({
  item,
  currentHour,
  setSelectedSlotId,
  setSelectedDoctorId,
}: BookedSlotProps) {
  const {
    regularAppointments,
    emergencyAppointments,
    videoAppointments,
    regularSlot,
    videoSlot,
    emergencySlot,
    appointmentRangeStart,
    appointmentRangeEnd,
  } = item;
  const startTime = moment()
    .startOf("day")
    .add({ minutes: appointmentRangeStart })
    .format("HH:mm");
  const endTime = moment()
    .startOf("day")
    .add({ minutes: appointmentRangeEnd })
    .format("HH:mm");
  const diff = appointmentRangeEnd - appointmentRangeStart;
  const currentHourDate = moment().set({
    hour: currentHour,
    minute: 0,
    second: 0,
  });
  const startTimeDiff = moment()
    .startOf("day")
    .set({ minutes: item.appointmentRangeStart })
    .diff(currentHourDate, "minutes");
  const width = (diff / 60) * 100;
  const left = (startTimeDiff / 60) * 100;

  const booked =
    regularAppointments + emergencyAppointments + videoAppointments;
  const total = regularSlot + videoSlot + emergencySlot;

  const percent = (booked / total) * 100;
  const className = () => {
    if (percent === 0) {
      return "";
    }
    if (percent <= 50) {
      return "green__theme__slot";
    }
    if (booked === total) {
      return "pink__theme__slot";
    }
    return "yellow__theme__slot";
  };

  return (
    <div
      className={`booking__slot__helper__container ${className()}`}
      style={{ width: `${width}%`, left: `${left}%`, zIndex: currentHour }}
      onClick={() => {
        setSelectedSlotId(item.id);
        setSelectedDoctorId(item.doctorId);
      }}
    >
      <p className="title">
        {booked}/{total} Appointments
      </p>
      <p className="time">
        {startTime} -{endTime}
      </p>
    </div>
  );
}

const getBookingByHour = (
  hour: number,
  currentDate: string,
  appointments: Booking[],
  setSelectedSlotId: Function,
  setSelectedDoctorId: Function
) => {
  // find bookings starts in this in the current hour

  const bookingsInCurrentHour = appointments?.filter((item) => {
    const bookingStartingHour = moment()
      .startOf("day")
      .add({ minutes: item.appointmentRangeStart })
      .format("H");
    return bookingStartingHour === hour.toString();
  });

  if (bookingsInCurrentHour?.length >= 1) {
    // pass the booking to a component which will handle style and position based on the star and end time
    return bookingsInCurrentHour.map((booking) => (
      <BookedSlotHelper
        item={booking}
        currentHour={hour}
        setSelectedSlotId={setSelectedSlotId}
        setSelectedDoctorId={setSelectedDoctorId}
      />
    ));
  }
  return "";
};

const getLeftByCurrentTime = () => {
  const hours = moment().get("h");
  const minutes = moment().get("m");
  const left = 158 * ((hours * 60 + minutes) / 60);
  return left;
};

function AppointmentTimelineCalendar({
  appointmentsData,
  currentDate,
  setSelectedSlotId,
  setSelectedDoctorId,
}: Props) {
  const currentTimeLineRef = useRef<HTMLDivElement | null>(null);
  const resourceTableRef = useRef<HTMLTableElement | null>(null);

  const scrollTheTimelineToView = () => {
    const rect = currentTimeLineRef.current?.getBoundingClientRect() || {
      left: 0,
      x: 0,
    };
    resourceTableRef.current?.scrollTo({
      left: rect.x >= 1300 ? rect.x - 700 : 0,
    });
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      scrollTheTimelineToView();
    }, 300);

    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  return (
    <div className="appointment__timeline__calander__container">
      <div className="left__resource__container">
        <div className="header">
          <p>Doctors</p>
        </div>
        {appointmentsData.map((resorce) => (
          <div className="resource__each">
            <DoctorProfileIcon
              name={resorce.name}
              avaliableHours={12}
              profileImage={resorce.profileImageUrl}
            />
          </div>
        ))}
      </div>
      <div
        className="resource__timeline__table__container"
        ref={resourceTableRef}
      >
        {/* <div
          className="blue__arrow"
          style={{ left: getLeftByCurrentTime() - 2.5 }}
        /> */}
        {/* <div
          ref={currentTimeLineRef}
          className="blue__line"
          style={{ left: getLeftByCurrentTime() }}
        /> */}
        <table className="resource__timeline__table">
          <tr className="header__row">
            {appointmentsData.map((item) => (
              <th className="each__header">{item?.wardname}</th>
            ))}
          </tr>
          {appointmentsData.map((resorce) => (
            <tr className="resource__timeline__row" key={resorce.id}>
              {appointmentsData.map((item) => (
                <td className="each__slots">{item.patientsCount} </td>
              ))}
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default AppointmentTimelineCalendar;
