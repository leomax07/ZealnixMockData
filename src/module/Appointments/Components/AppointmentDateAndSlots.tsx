/* eslint-disable no-nested-ternary */
import moment from "moment";
import { Calendar } from "primereact/calendar";
import { OverlayPanel } from "primereact/overlaypanel";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "primereact/tooltip";
import { AppDispatch, RootState } from "../../../redux/store";
import { formatMinutesToTimeString } from "../../../utils/reusableFunctions";
import { getAppointmentSlotsByDoctorId } from "../store/appointmentMiddleware";
import prevIcon from "../../../assets/prev-icon.svg";
import nextIcon from "../../../assets/next-icon.svg";

interface Props {
	label?: string;
	doctorId: string;
	type: string;
	date: string | Date;
	setDate: Function;
	selectedSlotId: string;
	setSelectedSlotId: Function;
	disabled?: boolean;
}

function AppointmentDateAndSlots({
	label = "Appointment Date and Slot",
	doctorId,
	type,
	date,
	setDate,
	selectedSlotId,
	setSelectedSlotId,
	disabled,
}: Props) {
	const dispatch = useDispatch<AppDispatch>();
	const [selectedSlot, setSelectedSlot] = useState<any>();
	const op = useRef<OverlayPanel>(null);
	const { slotsForDoctor } = useSelector<
		RootState,
		RootState["appointmentReducers"]
	>((state) => state.appointmentReducers);
	// to fetch appointment slots
	const fetchData = async () => {
		const payload = {
			doctorId,
			body: {
				type,
				date: moment(date).startOf("day").toISOString(),
			},
		};

		await dispatch(getAppointmentSlotsByDoctorId(payload));
	};
	// fetch slots data if type / date / doctor id changes
	useEffect(() => {
		if (!doctorId || !type) return;
		setSelectedSlot("");
		fetchData();
		console.log("this has been trigerred", date, doctorId, type);
	}, [doctorId, type, date]);

	// find the slot object by slotId and set it to selectedSlot object
	useEffect(() => {
		const slot = slotsForDoctor.find(
			(slotData: any) => slotData.id === selectedSlotId
		);
		setSelectedSlot(slot);
	}, [selectedSlotId, slotsForDoctor]);

	const toggleOverlay = (e: any) => {
		if (disabled) return;
		op?.current?.toggle(e);
	};

	// selection of slot
	const handleSlotSlection = (slotData: any) => {
		console.log(slotData);
		// deselection if clicked on the same slot
		if (selectedSlot?.id && selectedSlot.id === slotData.id) {
			setSelectedSlotId("");
			return;
		}
		setSelectedSlotId(slotData.id);
	};

	// change date from prev and next icons
	const handlePrevAndNext = (day: number) => {
		const newDate = moment(date).add({ day }).toDate();

		setDate(newDate);
	};

	// to show the appointment time and slot selected
	const formattedPlaceholder = () => {
		// initial string
		if (!date && !selectedSlot) return "Select a slot";

		return `${moment(new Date(date)).format("DD-MM-YY")} ${
			selectedSlot
				? `${formatMinutesToTimeString(
						selectedSlot?.appointmentRangeStart
				  )}-${formatMinutesToTimeString(selectedSlot?.appointmentRangeEnd)}`
				: ""
		}`;
	};

	// check wheter the slot is disabled or not
	const isSlotDisabled = (slot: any) => {
		const isAfter =
			moment(date)
				.set({ minutes: slot.appointmentRangeEnd })
				.toDate()
				.getTime() > new Date().getTime();

		if (!isAfter || slot[`${type}Slot`] < 1) return true;
		return false;
	};

	return (
		<div className="appointment__date__and__slot__container">
			<p> {label}</p>
			<div
				className="mock__input"
				onClick={toggleOverlay}
			>
				{formattedPlaceholder()}
			</div>
			<OverlayPanel ref={op}>
				<div className="dropdown__content">
					<div className="date__conteiner">
						<div
							className="left date__container__buttons"
							onClick={() => handlePrevAndNext(-1)}
						>
							<img
								src={prevIcon}
								alt="previcon"
							/>
						</div>
						<Calendar
							value={new Date(date)}
							onChange={(e: any) => {
								setDate(e.target.value);
							}}
						/>
						<div
							className="right date__container__buttons"
							onClick={() => handlePrevAndNext(1)}
						>
							<img
								src={nextIcon}
								alt="nexticon"
							/>
						</div>
					</div>
					<Tooltip target=".custom-target-icon" />
					<div className="solts__container">
						{slotsForDoctor.length
							? slotsForDoctor.map((slot: any) => (
									<p
										data-pr-tooltip={`${slot[`${type}Slot`]} slots available`}
										data-pr-position="right"
										data-pr-my="left center-2"
										className={`custom-target-icon slots${
											isSlotDisabled(slot)
												? "__disabled"
												: selectedSlot?.id === slot.id
												? "__selected"
												: ""
										}`}
										onClick={() => handleSlotSlection(slot)}
									>
										{`${formatMinutesToTimeString(
											slot?.appointmentRangeStart
										)} - ${formatMinutesToTimeString(
											slot?.appointmentRangeEnd
										)}`}
									</p>
							  ))
							: "No slots available"}
					</div>
				</div>
			</OverlayPanel>
		</div>
	);
}

export default AppointmentDateAndSlots;
