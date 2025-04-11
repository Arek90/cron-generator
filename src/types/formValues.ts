export type FormValues = {
  dayType: "every" | "specificDay";
  selectedDays: number[];
  monthType: "every" | "specificMonth";
  selectedMonths: number[];
  weekDayType: "every" | "specificDayType";
  selectedWeekDays: number[];

  minuteType: "every" | "range" | "step" | "specificMinute";
  selectedMinutes: number[];
  minuteFrom: number | string;
  minuteTo: number | string;
  minuteStep: number | string;

  hourType: "every" | "range" | "step" | "specificHour";
  selectedHours: number[];
  hourFrom: number | string;
  hourTo: number | string;
  hourStep: number | string;

  scheduleInput: string;
};
