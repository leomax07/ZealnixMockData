
import moment from "moment";

export const convertToStartOfDayISOString = (date: string | Date): string =>
  moment(new Date(date)).startOf("day").toISOString();
export const calculateAgeFromDate = (date: Date): string => {
  if (!date) return "";
  const timeDiff = new Date().getTime() - new Date(date).getTime();
  const years = timeDiff / 31536000;
  return Number(years).toFixed(0);
};
export const convertTimeStringToMinutes = (date: string | number) => {
  if (!date) return 0;
  const momentDate = moment(new Date(date));
  return momentDate.hours() * 60 + momentDate.minutes();
};
export const concertMinutesToTimeString = (minute: number): string => {
  const minutes = minute || 0;
  const timeString = moment().set({ minutes, hours: 0 });
  return timeString.toString();
};
export const generateRandomPassword = () => {
  let password = "";
  const digits =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const passwordLength = 10;
  for (let i = 0; i < passwordLength; i += 1) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    password += digits[randomIndex];
  }

  return password;
};
export const formatMinutesToTimeString = (
  minutes: number | undefined,
): string => {
  if (minutes === undefined) return "";
  return moment().startOf("day").set({ minutes }).format("hh:mm a");
};

export const getTimeFromMinutes = (minutes: number | undefined): string => {
  if (!minutes) return "-";
  return moment().startOf("day").add({ minutes }).format("hh:mm a");
};

/* eslint-disable */
export const removeEmptyObject = (data: any) => {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      if (
        data[key] === "" ||
        (Array.isArray(data[key]) && data[key].length === 0)
      ) {
        delete data[key];
      }
    }
  }
  return data;
};
/* eslint-enable */

export const dateAndTimeFormat = (data: string) => {
  const outputFormat = "D MMM YYYY h:mm A";
  return moment(data).format(outputFormat);
};

export const fnFirstcharacter = (e:any) =>  e?.charAt(0)?.toUpperCase();



