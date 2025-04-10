import { useEffect } from "react";

type FieldType =
  | "range"
  | "step"
  | "specificMinute"
  | "specificHour"
  | "specificDay"
  | "specificMonth"
  | "specificDayType";
type ClearErrorsFunction = (name: string) => void;

const useCleanupOnTypeChange = (
  minuteType: FieldType,
  hourType: FieldType,
  dayType: FieldType,
  monthType: FieldType,
  weekDayType: FieldType,
  clearErrors: ClearErrorsFunction,
): void => {
  useEffect(() => {
    const typeMappings: Array<{
      type: FieldType;
      condition: FieldType;
      fields: string[];
    }> = [
      {
        type: minuteType,
        condition: "range",
        fields: ["minuteFrom", "minuteTo"],
      },
      { type: minuteType, condition: "step", fields: ["minuteStep"] },
      {
        type: minuteType,
        condition: "specificMinute",
        fields: ["selectedMinutes"],
      },
      { type: hourType, condition: "range", fields: ["hourFrom", "hourTo"] },
      { type: hourType, condition: "step", fields: ["hourStep"] },
      { type: hourType, condition: "specificHour", fields: ["selectedHours"] },
      { type: dayType, condition: "specificDay", fields: ["selectedDays"] },
      {
        type: monthType,
        condition: "specificMonth",
        fields: ["selectedMonths"],
      },
      {
        type: weekDayType,
        condition: "specificDayType",
        fields: ["selectedWeekDays"],
      },
    ];

    typeMappings.forEach(({ type, condition, fields }) => {
      if (type !== condition) {
        fields.forEach((field) => clearErrors(field));
      }
    });
  }, [minuteType, hourType, dayType, monthType, weekDayType, clearErrors]);
};

export default useCleanupOnTypeChange;
