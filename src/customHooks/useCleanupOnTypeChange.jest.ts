import { renderHook } from "@testing-library/react";
import useCleanupOnTypeChange from "./useCleanupOnTypeChange";

describe("useCleanupOnTypeChange", () => {
  it("calls clearErrors for minute-related fields when minuteType changes", () => {
    const clearErrorsMock = jest.fn();

    renderHook(() =>
      useCleanupOnTypeChange(
        "step",
        "specificHour",
        "specificDay",
        "specificMonth",
        "specificDayType",
        clearErrorsMock,
      ),
    );

    expect(clearErrorsMock).toHaveBeenCalledWith("minuteFrom");
    expect(clearErrorsMock).toHaveBeenCalledWith("minuteTo");
    expect(clearErrorsMock).toHaveBeenCalledWith("selectedMinutes");

    expect(clearErrorsMock).not.toHaveBeenCalledWith("minuteStep");
  });

  it("does not call clearErrors for fields matching their type", () => {
    const clearErrorsMock = jest.fn();

    renderHook(() =>
      useCleanupOnTypeChange(
        "step",
        "step",
        "specificDay",
        "specificMonth",
        "specificDayType",
        clearErrorsMock,
      ),
    );

    expect(clearErrorsMock).not.toHaveBeenCalledWith("minuteStep");
    expect(clearErrorsMock).not.toHaveBeenCalledWith("hourStep");
    expect(clearErrorsMock).not.toHaveBeenCalledWith("selectedDays");
    expect(clearErrorsMock).not.toHaveBeenCalledWith("selectedMonths");
    expect(clearErrorsMock).not.toHaveBeenCalledWith("selectedWeekDays");
  });

  it("calls clearErrors for hour-related fields if hourType !== expected", () => {
    const clearErrorsMock = jest.fn();

    renderHook(() =>
      useCleanupOnTypeChange(
        "range",
        "range",
        "step",
        "range",
        "range",
        clearErrorsMock,
      ),
    );

    expect(clearErrorsMock).toHaveBeenCalledWith("minuteStep");
    expect(clearErrorsMock).toHaveBeenCalledWith("selectedMinutes");
    expect(clearErrorsMock).toHaveBeenCalledWith("hourStep");
    expect(clearErrorsMock).toHaveBeenCalledWith("selectedHours");
    expect(clearErrorsMock).toHaveBeenCalledWith("selectedDays");
    expect(clearErrorsMock).toHaveBeenCalledWith("selectedMonths");
    expect(clearErrorsMock).toHaveBeenCalledWith("selectedWeekDays");
  });
});
