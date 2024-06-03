/* eslint-disable no-nested-ternary */
import { Tab, TabNavigation } from "evergreen-ui";
import moment from "moment";
import { useEffect, useState } from "react";

interface Props {
  selectedDay?: string;
  onChange?: Function;
  selectedDate?: string;
  setSelectedDate?: Function;
}
interface Taboptions {
  index: number;
  label: string;
}

function DateTab({
  selectedDay,
  onChange,
  selectedDate,
  setSelectedDate,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState("Today");

  const handleTabClick = (tab: Taboptions) => {
    setSelectedIndex(tab.label);
    if (onChange) onChange(tab.label);
    if (setSelectedDate) {
      const startOfDay = moment().startOf("day");
      const date =
        tab.label === "Today"
          ? startOfDay.toDate()
          : tab.label === "Yesterday"
          ? startOfDay.add({ day: -1 }).toDate()
          : startOfDay.add({ day: 1 }).toDate();
      setSelectedDate(date);
    }
  };

  function dateToFromNowDaily(myDate: any) {
    // get from-now for this date
    const fromNow = moment(myDate).fromNow();

    // ensure the date is displayed with today and yesterday
    return moment(myDate).calendar(null, {
      // when the date is closer, specify custom values
      lastWeek: "[Last] dddd",
      lastDay: "[Yesterday]",
      sameDay: "[Today]",
      nextDay: "[Tomorrow]",
      nextWeek: "dddd",
      // when the date is further away, use from-now functionality
      sameElse() {
        return `[${fromNow}]`;
      },
    });
  }

  useEffect(() => {
    const day = dateToFromNowDaily(selectedDate);
    if (!selectedDay) return;
    setSelectedIndex(day);
  }, [selectedDay, selectedDate]);

  const tabs = [
    { index: 0, label: "Yesterday" },
    { index: 1, label: "Today" },
    { index: 2, label: "Tomorrow" },
  ];
  return (
    <div className="date__tab__container">
      <TabNavigation>
        {tabs.map((tab) => (
          <Tab
            isSelected={selectedIndex === tab.label}
            key={tab.index}
            onClick={() => handleTabClick(tab)}
            className="each__tab"
          >
            {tab.label}
          </Tab>
        ))}
      </TabNavigation>
    </div>
  );
}

export default DateTab;
