import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ButtonComponent from "../../../../../Components/Buttons/Index";
import clockImg from "../../../../../assets/small-clock.svg";
import timePeriod from "../../../../../assets/time-period.svg";
import SlotDoctorsTable from "./SlotDoctorsTable";
import { AppDispatch, RootState } from "../../../../../redux/store";
import { getSlotsBySlotId } from "../store/slotsMiddleWare";
import { formatMinutesToTimeString } from "../../../../../utils/reusableFunctions";

interface Props {
  slotId: string;
}

function ViewDotorsInSlots({ slotId }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { slotDetails } = useSelector<RootState, RootState["slotsReducers"]>(
    (state) => state.slotsReducers,
  );

  const fetchData = async () => {
    const query = {
      include: [
        {
          relation: "doctors",
          scope: { include: [{ relation: "department" }] },
        },
      ],
    };
    await dispatch(
      getSlotsBySlotId({
        id: slotId,
        filter: encodeURI(JSON.stringify(query)),
      }),
    );
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="view__doctors__in__slots">
      <div className="head__part">
        <div className="header">
          <div className="left">
            <p className="title">
              Doctors{" "}
              <span className="light">({slotDetails?.doctorIds.length})</span>
            </p>
            <div className="light__sub__text">
              Here’s the list of Doctors within the appointment time
            </div>
          </div>
          <div className="right" style={{ display: "none" }}>
            <ButtonComponent label="Add" />
          </div>
        </div>
        <div className="sub__header">
          <div className="key__value">
            <img src={clockImg} alt="clock" />
            <p className="key">Timings : </p>
            <p className="value">
              {formatMinutesToTimeString(slotDetails?.appointmentRangeStart)} -{" "}
              {formatMinutesToTimeString(slotDetails?.appointmentRangeEnd)}
            </p>
          </div>
          <div className="key__value">
            <img src={timePeriod} alt="timePeriod" />
            <p className="key">Regular : </p>
            <p className="value">{slotDetails?.regularSlot || 0}</p>
          </div>
          <div className="key__value">
            <img src={timePeriod} alt="timePeriod" />
            <p className="key">Emergency : </p>
            <p className="value">{slotDetails?.emergencySlot || 0}</p>
          </div>
          <div className="key__value">
            <img src={timePeriod} alt="timePeriod" />
            <p className="key">Video : </p>
            <p className="value">{slotDetails?.videoSlot || 0}</p>
          </div>
        </div>
      </div>
      <div className="body__part">
        <SlotDoctorsTable data={slotDetails?.doctors || []} />
      </div>
    </div>
  );
}

export default ViewDotorsInSlots;
