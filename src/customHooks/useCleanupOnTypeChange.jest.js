"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@testing-library/react");
var useCleanupOnTypeChange_1 = __importDefault(require("./useCleanupOnTypeChange"));
describe("useCleanupOnTypeChange", function () {
    it("calls clearErrors for minute-related fields when minuteType changes", function () {
        var clearErrorsMock = jest.fn();
        (0, react_1.renderHook)(function () {
            return (0, useCleanupOnTypeChange_1.default)("step", "specificHour", "specificDay", "specificMonth", "specificDayType", clearErrorsMock);
        });
        expect(clearErrorsMock).toHaveBeenCalledWith("minuteFrom");
        expect(clearErrorsMock).toHaveBeenCalledWith("minuteTo");
        expect(clearErrorsMock).toHaveBeenCalledWith("selectedMinutes");
        expect(clearErrorsMock).not.toHaveBeenCalledWith("minuteStep");
    });
    it("does not call clearErrors for fields matching their type", function () {
        var clearErrorsMock = jest.fn();
        (0, react_1.renderHook)(function () {
            return (0, useCleanupOnTypeChange_1.default)("step", "step", "specificDay", "specificMonth", "specificDayType", clearErrorsMock);
        });
        expect(clearErrorsMock).not.toHaveBeenCalledWith("minuteStep");
        expect(clearErrorsMock).not.toHaveBeenCalledWith("hourStep");
        expect(clearErrorsMock).not.toHaveBeenCalledWith("selectedDays");
        expect(clearErrorsMock).not.toHaveBeenCalledWith("selectedMonths");
        expect(clearErrorsMock).not.toHaveBeenCalledWith("selectedWeekDays");
    });
    it("calls clearErrors for hour-related fields if hourType !== expected", function () {
        var clearErrorsMock = jest.fn();
        (0, react_1.renderHook)(function () {
            return (0, useCleanupOnTypeChange_1.default)("range", "range", "step", "range", "range", clearErrorsMock);
        });
        expect(clearErrorsMock).toHaveBeenCalledWith("minuteStep");
        expect(clearErrorsMock).toHaveBeenCalledWith("selectedMinutes");
        expect(clearErrorsMock).toHaveBeenCalledWith("hourStep");
        expect(clearErrorsMock).toHaveBeenCalledWith("selectedHours");
        expect(clearErrorsMock).toHaveBeenCalledWith("selectedDays");
        expect(clearErrorsMock).toHaveBeenCalledWith("selectedMonths");
        expect(clearErrorsMock).toHaveBeenCalledWith("selectedWeekDays");
    });
});
