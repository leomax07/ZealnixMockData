import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AppointmentTimelineCalendar from "../../../../Components/AppointmentsTimeline/Index";
import UpcomingEvent from "../../../../Components/UpcomingEvent/upcomingevent";
import { BRANCH_ID, DAYS_OF_WEEK, HOSPITAL_ID } from "../../../../constants";
import { AppDispatch, RootState } from "../../../../redux/store";
import { convertTimeStringToMinutes } from "../../../../utils/reusableFunctions";
import {
  getAppointmentsCalendarData,
  getUpcomingAppointments,
} from "../../../Appointments/store/appointmentMiddleware";
import "./staffAppointments.scss";

function StaffAppointments() {
  const { appointmentCalendarData } = useSelector<
    RootState,
    RootState["appointmentReducers"]
  >((state) => state.appointmentReducers);
  const [date, setDate] = useState([
    moment().startOf("week").toISOString(),
    moment().endOf("week").toISOString(),
  ]);
  const dispatch = useDispatch<AppDispatch>();
  const { appointments, upcommingAppointment } = useSelector<
    RootState,
    RootState["appointmentReducers"]
  >((state) => state.appointmentReducers);
  const { id }: any = useParams<string>();
  const [appointmentByWeek, setAppointmentByWeek] = useState<any[] | []>([]);

  useEffect(() => {
    const startOfTheWeek = moment().startOf("week").toISOString();
    const endOfTheWeek = moment().endOf("week").toISOString();

    setDate([startOfTheWeek, endOfTheWeek]);
  }, []);

  const handleFectchAppointments = async () => {
    const payload = {
      date: { between: date },
      branchId: BRANCH_ID,
      doctorId: id,
    };
    await dispatch(getAppointmentsCalendarData(payload));
  };

  useEffect(() => {
    handleFectchAppointments();
  }, [date, id]);

  const fetchAppointmentsByDate = async () => {
    const upcomingAppointments = {
      where: {
        hospitalId: HOSPITAL_ID,
        doctorId: id,
        $or: [
          {
            $and: [
              {
                appointmentDate: { $eq: moment().startOf("day").toISOString() },
                "appointmentSchedule.appointmentRangeStart": {
                  $gte: convertTimeStringToMinutes(moment().toString()),
                },
              },
            ],
          },
          { appointmentDate: { $gt: moment().startOf("day").toISOString() } },
        ],
      },
      include: ["hospital", "doctor", "department", "patient"],
    };

    await dispatch(
      getUpcomingAppointments(encodeURI(JSON.stringify(upcomingAppointments))),
    );
  };

  const transformAppointmentsToWeeks = () => {
    const appByWeek = DAYS_OF_WEEK.map((day, index) => {
      const todayDate = moment()
        .startOf("day")
        .startOf("week")
        .add({ day: index })
        .toISOString();

      return {
        name: day,

        slotDetails: appointmentCalendarData.length
          ? appointmentCalendarData[0].doctor_schedule.map((item: any) => {
              const appointment =
                appointmentCalendarData[0].appointments[item.id];

              return {
                ...item,
                regularAppointments:
                  appointment?.regular?.filter(
                    (app: any) => app.appointmentDate === todayDate,
                  )?.length || 0,
                emergencyAppointments:
                  appointment?.emergency?.filter(
                    (app: any) => app.appointmentDate === todayDate,
                  )?.length || 0,
                videoAppointments:
                  appointment?.video?.filter(
                    (app: any) => app.appointmentDate === todayDate,
                  )?.lengthlength?.length || 0,
                doctorId: appointmentCalendarData[0].id,
              };
            })
          : [],
        appointmentDate: todayDate,
        check: "now",
      };
    });
    console.log("appointmentBy week", appByWeek);
    setAppointmentByWeek(appByWeek);
  };

  useEffect(() => {
    transformAppointmentsToWeeks();
  }, [appointments, id, appointmentCalendarData]);

  useEffect(() => {
    fetchAppointmentsByDate();
  }, [id, date]);

  return (
    <div className="staff__profilepage__container">
      <div className="custom__apointment__timeline">
        <AppointmentTimelineCalendar
          appointmentsData={appointmentByWeek}
          currentDate={moment().toString()}
          setSelectedSlotId={() => {}}
          setSelectedDoctorId={() => {}}
        />
      </div>

      <div className="staff_profilepage_calendar_flex">
        <div className="staff_profilepage_calendar">
          {/* <Calendar
						value={date}
						onChange={(e) => setDate(e.value)}
						inline
						selectionMode="range"
					/> */}
        </div>
        <div className="staff_profilepage_upcoming">
          <UpcomingEvent
            title="Upcoming Appointments"
            subTitle="This Month"
            cardHeight="250px"
            data={upcommingAppointment}
          />
        </div>
      </div>
    </div>
  );
}

export default StaffAppointments;
