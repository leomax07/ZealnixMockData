// import React, { ChangeEvent, useEffect, useState } from "react";
import { HabitListTypes } from "../../../constants";
import RadioButtonComponent from "../../../Components/RadioButton/Index";

interface HabbitListHelperType {
  habbitList: HabitListTypes[];
  handleHabbit: Function;
}

const EXERCISE_HABIT_LABEL: any = {
  never: "Never",
  two_three_days_a_week: "2-3 days a week",
  three_five_days_a_week: "3-5 days a week",
  more_than_five_days_a_week: "More than 5 Days a week",
};

const DIET_STYLE_LABEL: any = {
  loose_diet: "I have a loose diet",
  strict_diet: "I have a strict diet",
  no_diet_plan: "I don't have a diet",
};
const ALCOHOL_CONSUMPTION_LABLE: any = {
  never: "Never",
  moderate: "Moderate (>3 drinks a day)",
  frequent: "Frequent (>3 drinks a day)",
};
const CAFFINE_CONSUMPTION_LABEL: any = {
  never: "Never",
  moderate: "Moderate (<2 times a day)",
  frequent: "Frequent (>2 times a day)",
};
const SMOKING_HABIT_LABEL: any = {
  never: "Never",
  moderate: "Moderate (>3 cigarettes a day)",
  frequent: "Frequent (Betweeen 3 and 10 cigarettes a day)",
  chain_smoker: "Chain Smoker (>20 cigarettes a day)",
};

const labelHandler = (value: string, habbitType: string) => {
  let label = "";
  if (habbitType === "exerciseHabit") {
    label = EXERCISE_HABIT_LABEL[value];
  }
  if (habbitType === "dietStyle") {
    label = DIET_STYLE_LABEL[value];
  }
  if (habbitType === "alcoholConsumption") {
    label = ALCOHOL_CONSUMPTION_LABLE[value];
  }
  if (habbitType === "caffeineConsumption") {
    label = CAFFINE_CONSUMPTION_LABEL[value];
  }
  if (habbitType === "smokingHabit") {
    label = SMOKING_HABIT_LABEL[value];
  }
  return label;
};

function HabbitListComponent({
  habbitList,
  handleHabbit,
}: HabbitListHelperType) {
  return (
    <>
      {habbitList.map((listItem) => (
        <div className="habbits__list__item">
          <p className="habbit__title">{listItem.label}</p>
          <div className="habbits__checks">
            {listItem.options.map((habbitOptions) => (
              <div className="each__habbit__radio" key={habbitOptions}>
                <RadioButtonComponent
                  value={habbitOptions}
                  label={labelHandler(habbitOptions, listItem.name)}
                  checked={habbitOptions === listItem.checked}
                  setValue={(e: any) => {
                    handleHabbit(e, listItem.index);
                  }}
                  name={listItem.label}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default HabbitListComponent;
