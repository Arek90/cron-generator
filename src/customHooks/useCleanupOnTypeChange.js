"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useCleanupOnTypeChange = function (minuteType, hourType, dayType, monthType, weekDayType, clearErrors) {
    (0, react_1.useEffect)(function () {
        var typeMappings = [
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
        typeMappings.forEach(function (_a) {
            var type = _a.type, condition = _a.condition, fields = _a.fields;
            if (type !== condition) {
                fields.forEach(function (field) { return clearErrors(field); });
            }
        });
    }, [minuteType, hourType, dayType, monthType, weekDayType, clearErrors]);
};
exports.default = useCleanupOnTypeChange;
