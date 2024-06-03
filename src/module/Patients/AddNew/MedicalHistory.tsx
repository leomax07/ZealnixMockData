import React, { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonComponent from "../../../Components/Buttons/Index";
import TextAreaComponent from "../../../Components/TextAreaComponent/Index";
import TextInputComponent from "../../../Components/TextInput/Index";
import {
	HABBITS_LIST,
	HabitListTypes,
	HabitData,
	ILLNESS_HISTORY,
	OperationListType,
	MedicalHistoryType,
} from "../../../constants";
import { AppDispatch, RootState } from "../../../redux/store";
import MultiSelectDropdown from "../../../Components/MultiSelect/Index";
import { setPatient } from "../store/patientsReducer";
import HabbitListComponent from "./medicalHistoryHelper";
import DatePickerComponent from "../../../Components/DatePicker/Index";

interface MedicalHistoryPropType {
	setIndex: (args: any) => void;
	edit?: boolean;
	editPatient: any;
}

function MedicalHistory({
	setIndex,
	edit,
	editPatient,
}: MedicalHistoryPropType) {
	const dispatch = useDispatch<AppDispatch>();
	const [medicalList, setMedicalList] = useState<MedicalHistoryType>({
		reasonForVisit: "",
		drugAllergies: "",
		illnessHistory: [],
		surgeryHistory: [],
		exerciseHabit: "",
		dietStyle: "",
		alcoholConsumption: "",
		caffeineConsumption: "",
		smokingHabit: "",
		medicalHistoryComments: "",
	});

	const [operationList, setOperationList] = useState<OperationListType[]>([
		{
			index: 0,
			operationName: "",
			operationDate: "",
		},
	]);

	const [habbitsList, setHabbitsList] =
		useState<HabitListTypes[]>(HABBITS_LIST);

	useEffect(() => {
		if (edit) {
			const {
				reasonForVisit,
				drugAllergies,
				illnessHistory,
				surgeryHistory,
				exerciseHabit,
				dietStyle,
				alcoholConsumption,
				caffeineConsumption,
				smokingHabit,
				medicalHistoryComments,
			} = editPatient;

			setMedicalList({
				reasonForVisit,
				drugAllergies,
				illnessHistory,
				surgeryHistory,
				exerciseHabit,
				dietStyle,
				alcoholConsumption,
				caffeineConsumption,
				smokingHabit,
				medicalHistoryComments,
			});
			if (surgeryHistory) setOperationList(() => [...surgeryHistory]);

			setHabbitsList(() => {
				const result = [
					{
						index: 0,
						label: "Excercise",
						checked: exerciseHabit,
						name: "exerciseHabit",
						options: [
							"never",
							"two_three_days_a_week",
							"three_five_days_a_week",
							"more_than_five_days_a_week",
						],
					},
					{
						index: 1,
						label: "Following a Diet",
						checked: dietStyle,
						name: "dietStyle",
						options: ["loose_diet", "strict_diet", "no_diet_plan"],
					},
					{
						index: 2,
						label: "Alcohol Consumption",
						name: "alcoholConsumption",
						checked: alcoholConsumption,
						options: ["never", "moderate", "frequent"],
					},
					{
						index: 3,
						label: "Caffeine Consumption",
						checked: caffeineConsumption,
						name: "caffeineConsumption",
						options: ["never", "moderate", "frequent"],
					},
					{
						index: 4,
						label: "Smoking",
						name: "smokingHabit",
						checked: smokingHabit,
						options: ["never", "moderate", "frequent"],
					},
				];

				return result;
			});
		}
	}, [editPatient]);

	const { initialPatient } = useSelector<
		RootState,
		RootState["patientsReducers"]
	>((state) => state.patientsReducers);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMedicalList((prev: MedicalHistoryType) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleAddButton = () => {
		setOperationList((prev) => [
			...prev,
			{ index: prev.length, operationDate: "", operationName: "" },
		]);
	};

	const handleHabbitList = (e: any, index: number): void => {
		setHabbitsList((prev) =>
			prev.map((habbits) => {
				if (habbits.index !== index) {
					return habbits;
				}
				return { ...habbits, checked: e };
			})
		);
	};

	const savePatientDetails = () => {
		const reducedData: Array<{
			[key: string]: string | undefined;
		}> = [];
		habbitsList.reduce((acc, curr) => {
			reducedData.push({ [curr.name]: curr.checked });
			return acc;
		}, []);
		const updatedHabitList: HabitData = {};
		reducedData.forEach((element) => {
			const key = Object.keys(element)[0] as keyof HabitData;
			const value = element[key];
			updatedHabitList[key] = value;
		});

		try {
			const payload: any = {
				...initialPatient,
				...medicalList,
				...updatedHabitList,
			};
			dispatch(setPatient(payload));
		} catch (err: any) {
			console.log(err.message);
		}
	};

	const handleSubmit = () => {
		// savePatientDetails();
		setIndex(3);
	};

	const dateChangeHandler = (
		e: ChangeEvent<HTMLInputElement>,
		operation: any
	) => {
		setOperationList((prev: OperationListType[]) => {
			const operations = [...prev];
			const filteredIndex = operations.findIndex(
				(ele) => ele?.index === operation.index
			);
			const replaceData = {
				...operations[filteredIndex],
				operationDate: e.target.value,
			};
			operations.splice(filteredIndex, 1, replaceData);
			return operations;
		});

		setMedicalList((prev: MedicalHistoryType) => ({
			...prev,
			surgeryHistory: operationList,
		}));
	};

	const inputChangeHandler = (
		e: ChangeEvent<HTMLInputElement>,
		operation: any
	) => {
		setOperationList((prev: OperationListType[]) => {
			const operations = [...prev];
			const operationIndex = operations.findIndex(
				(ele) => ele.index === operation.index
			);
			operations[operationIndex].operationName = e.target?.value;
			return operations;
		});

		setMedicalList((prev: MedicalHistoryType) => ({
			...prev,
			surgeryHistory: operationList,
		}));
	};

	return (
		<div className="medical__history__form">
			<p className="title">Patient Medical History</p>
			<div className="reson__to__visit">
				<TextInputComponent
					label="Reason for Visiting Doctor"
					name="reasonForVisit"
					value={medicalList.reasonForVisit}
					onChange={handleChange}
				/>
			</div>
			<div className="drug__alergy__title">
				<p className="title">List Any Drug Allergies</p>
				<p className="sub__title">Description</p>
				<TextAreaComponent
					inputClassName="full__width"
					name="drugAllergies"
					value={medicalList.drugAllergies}
					onChange={handleChange}
				/>
			</div>
			<div className="disease__list">
				{/* <p className="title">Have you ever had?</p>
        <p className="sub__title">Please check that all applies</p>
        <div className="disease__list__checkbox">
          {diseaseList.map((diseaseListItem, id) => {
            return (
              <div className="each__item" key={id}>
                <CheckboxComponent
                  label={diseaseListItem.label}
                  checked={diseaseListItem.checked}
                  checkboxId={diseaseListItem.label}
                />
              </div>
            );
          })}
        </div> */}
				<div className="other__illness">
					<p className="title">Other illness</p>
					<MultiSelectDropdown
						classNames="full__width"
						name="illnessHistory"
						value={medicalList.illnessHistory}
						items={ILLNESS_HISTORY}
						handleChange={handleChange}
					/>
				</div>
				<p className="title">Please list any surgeries and date of each.</p>
				<div className="operation__list__container">
					{operationList.map((operation) => (
						<div
							className="operation__list__item"
							key={operation.index}
						>
							<div className="each__input">
								<TextInputComponent
									label="surgery"
									name="surgeryHistory"
									value={operation.operationName}
									onChange={(e: ChangeEvent<HTMLInputElement>) => {
										inputChangeHandler(e, operation);
									}}
								/>
							</div>
							<div className="each__input">
								<DatePickerComponent
									label="surgery Date"
									value={new Date(operation.operationDate)}
									onChange={(e: ChangeEvent<HTMLInputElement>) =>
										dateChangeHandler(e, operation)
									}
								/>
							</div>
						</div>
					))}
					<div className="button__container">
						<ButtonComponent
							label="Add"
							type="outlined"
							onClick={handleAddButton}
						/>
					</div>
				</div>

				<div className="habbits__container">
					<p className="title">Healthy & Unhealthy Habits</p>
					<div className="habbits__radio__container">
						<HabbitListComponent
							habbitList={habbitsList}
							handleHabbit={handleHabbitList}
						/>
					</div>
				</div>
			</div>
			<div className="comments__container">
				<p className="title">
					Include any other comments regarding your medical history
				</p>
				<p className="sub__title">Description</p>
				<TextAreaComponent
					inputClassName="full__width"
					name="medicalHistoryComments"
					value={medicalList.medicalHistoryComments}
					onChange={handleChange}
				/>
			</div>
			<div className="buttons__container">
				<ButtonComponent
					label="Cancel"
					type="outlined"
				/>
				<ButtonComponent
					label="Next"
					onClick={handleSubmit}
				/>
			</div>
		</div>
	);
}

export default MedicalHistory;
