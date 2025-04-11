"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_hook_form_1 = require("react-hook-form");
var material_1 = require("@mui/material");
var react_1 = require("react");
var CustomSelect_tsx_1 = __importDefault(require("./CustomSelect.tsx"));
require("@fontsource/inter");
var useCleanupOnTypeChange_ts_1 = __importDefault(require("../customHooks/useCleanupOnTypeChange.ts"));
var rangeGenerators_ts_1 = require("../utils/rangeGenerators.ts");
var validateField_ts_1 = __importDefault(require("../utils/validateField.ts"));
var radioSx = {
    "& .MuiSvgIcon-root": {
        fontSize: "20px",
    },
};
var formControlLabelSx = {
    "& .MuiFormControlLabel-label": {
        fontSize: "15px",
        fontFamily: "Inter",
    },
};
var minutesRangeOptions = Array.from({ length: 60 }, function (_, i) { return i; });
var minutesStepOptions = Array.from({ length: 59 }, function (_, i) { return i + 1; });
var hoursRangeOptions = Array.from({ length: 24 }, function (_, i) { return i; });
var hoursStepOptions = Array.from({ length: 23 }, function (_, i) { return i + 1; });
var dayOptions = Array.from({ length: 31 }, function (_, i) { return i + 1; });
var monthOptions = [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
];
var weekDayOptions = [
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
    "Niedziela",
];
var PatternForm = function (_a) {
    var onClose = _a.onClose, onSubmit = _a.onSubmit;
    var _b = (0, react_hook_form_1.useForm)({
        defaultValues: {
            minuteType: "every",
            minuteFrom: "",
            minuteTo: "",
            minuteStep: "",
            selectedMinutes: [],
            hourType: "every",
            hourFrom: "",
            hourTo: "",
            hourStep: "",
            selectedHours: [],
            dayType: "every",
            selectedDays: [],
            monthType: "every",
            selectedMonths: [],
            weekDayType: "every",
            selectedWeekDays: [],
            scheduleInput: "",
        },
    }), control = _b.control, handleSubmit = _b.handleSubmit, watch = _b.watch, formState = _b.formState, clearErrors = _b.clearErrors, setValue = _b.setValue;
    var errors = formState.errors;
    var minuteType = watch("minuteType");
    var minuteFrom = watch("minuteFrom");
    var minuteTo = watch("minuteTo");
    var minuteStep = watch("minuteStep");
    var selectedMinutes = watch("selectedMinutes");
    var hourType = watch("hourType");
    var hourFrom = watch("hourFrom");
    var hourTo = watch("hourTo");
    var hourStep = watch("hourStep");
    var selectedHours = watch("selectedHours");
    var dayType = watch("dayType");
    var selectedDays = watch("selectedDays");
    var monthType = watch("monthType");
    var selectedMonths = watch("selectedMonths");
    var weekDayType = watch("weekDayType");
    var selectedWeekDays = watch("selectedWeekDays");
    var scheduleInput = watch("scheduleInput");
    var handleClear = function (fieldName) {
        var isArrayField = [
            "selectedMinutes",
            "selectedHours",
            "selectedDays",
            "selectedMonths",
            "selectedWeekDays",
        ].includes(fieldName);
        if (isArrayField) {
            setValue(fieldName, []);
        }
        else {
            setValue(fieldName, "");
        }
    };
    var useSetPattern = function (_a, setValue) {
        var minuteType = _a.minuteType, minuteFrom = _a.minuteFrom, minuteTo = _a.minuteTo, minuteStep = _a.minuteStep, selectedMinutes = _a.selectedMinutes, hourType = _a.hourType, hourFrom = _a.hourFrom, hourTo = _a.hourTo, hourStep = _a.hourStep, selectedHours = _a.selectedHours, dayType = _a.dayType, selectedDays = _a.selectedDays, monthType = _a.monthType, selectedMonths = _a.selectedMonths, weekDayType = _a.weekDayType, selectedWeekDays = _a.selectedWeekDays;
        (0, react_1.useEffect)(function () {
            var minutes = minuteType === "every"
                ? "*"
                : minuteType === "range"
                    ? (0, rangeGenerators_ts_1.generateMinutesRange)(minuteFrom, minuteTo)
                    : minuteType === "step"
                        ? "*/".concat(minuteStep)
                        : minuteType === "specificMinute"
                            ? selectedMinutes.sort(function (a, b) { return a - b; }).join(",")
                            : "*";
            var hours = hourType === "every"
                ? "*"
                : hourType === "range"
                    ? (0, rangeGenerators_ts_1.generateHoursRange)(hourFrom, hourTo)
                    : hourType === "step"
                        ? "*/".concat(hourStep)
                        : hourType === "specificHour"
                            ? selectedHours.sort(function (a, b) { return a - b; }).join(",")
                            : "*";
            var days = dayType === "every"
                ? "*"
                : dayType === "specificDay"
                    ? selectedDays.sort(function (a, b) { return a - b; }).join(",")
                    : "*";
            var months = monthType === "every"
                ? "*"
                : monthType === "specificMonth"
                    ? selectedMonths
                        .map(function (selectedMonth) {
                        return monthOptions.indexOf(String(selectedMonth)) + 1;
                    })
                        .sort(function (a, b) { return a - b; })
                        .join(",")
                    : "*";
            var weekDays = weekDayType === "every"
                ? "*"
                : weekDayType === "specificDayType"
                    ? selectedWeekDays
                        .map(function (selectedWeekDay) {
                        return weekDayOptions.indexOf(String(selectedWeekDay)) + 1;
                    })
                        .sort()
                        .join(",")
                    : "*";
            var cron = "".concat(minutes, " ").concat(hours, " ").concat(days, " ").concat(months, " ").concat(weekDays);
            setValue("scheduleInput", cron);
        }, [
            minuteType,
            minuteFrom,
            minuteTo,
            minuteStep,
            selectedMinutes,
            hourType,
            hourFrom,
            hourTo,
            hourStep,
            selectedHours,
            dayType,
            selectedDays,
            monthType,
            selectedMonths,
            weekDayType,
            selectedWeekDays,
            setValue,
        ]);
    };
    (0, useCleanupOnTypeChange_ts_1.default)(minuteType, hourType, dayType, monthType, weekDayType, clearErrors);
    var handleFormSubmit = function (formData) {
        console.log("Submitted schedule:", formData.scheduleInput);
        onSubmit(formData.scheduleInput);
        onClose();
    };
    useSetPattern({
        minuteType: minuteType,
        minuteFrom: minuteFrom,
        minuteTo: minuteTo,
        minuteStep: minuteStep,
        selectedMinutes: selectedMinutes,
        hourType: hourType,
        hourFrom: hourFrom,
        hourTo: hourTo,
        hourStep: hourStep,
        selectedHours: selectedHours,
        dayType: dayType,
        selectedDays: selectedDays,
        monthType: monthType,
        selectedMonths: selectedMonths,
        weekDayType: weekDayType,
        selectedWeekDays: selectedWeekDays,
    }, setValue);
    return (<form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex justify-center">
        <div className="w-[1440px] py-[50px] px-[70px] gap-[24px]">
          <div className="border border-x-0 border-t-0 border-b-[#EFF1F5] pb-[22px]">
            <material_1.Typography variant="h6" sx={{ fontFamily: "Inter" }}>
              Harmonogram
            </material_1.Typography>
            <material_1.Typography sx={{ fontSize: "30px" }}>{scheduleInput}</material_1.Typography>
          </div>
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div>
              <material_1.Typography sx={{ fontFamily: "Inter", fontWeight: 600 }}>
                Minuta
              </material_1.Typography>
              <react_hook_form_1.Controller name="minuteType" control={control} render={function (_a) {
            var field = _a.field;
            return (<material_1.RadioGroup {...field}>
                    <material_1.FormControlLabel value="every" control={<material_1.Radio sx={radioSx}/>} label="Każda minuta" sx={formControlLabelSx}/>
                    <material_1.FormControlLabel value="range" control={<material_1.Radio sx={radioSx}/>} label="Co minutę między" sx={formControlLabelSx}/>
                    <div className="flex gap-2 mt-2">
                      <react_hook_form_1.Controller name="minuteFrom" control={control} rules={{
                    validate: function (fieldValue) {
                        return (0, validateField_ts_1.default)(fieldValue, minuteType, "range", "Proszę wybrać przedział minut.");
                    },
                }} render={function (_a) {
                    var field = _a.field;
                    return (<CustomSelect_tsx_1.default {...field} value={Number(field.value)} disabled={minuteType !== "range"} onClick={function () { return handleClear(field.name); }} className="w-1/2">
                            {minutesRangeOptions.map(function (num) { return (<material_1.MenuItem key={num} value={num}>
                                {num}
                              </material_1.MenuItem>); })}
                          </CustomSelect_tsx_1.default>);
                }}/>
                      <span className="flex items-center px-[11px]">-</span>
                      <react_hook_form_1.Controller name="minuteTo" control={control} rules={{
                    validate: function (fieldValue) {
                        return (0, validateField_ts_1.default)(fieldValue, minuteType, "range", "Proszę wybrać przedział minut.");
                    },
                }} render={function (_a) {
                    var field = _a.field;
                    return (<CustomSelect_tsx_1.default {...field} value={Number(field.value)} disabled={minuteType !== "range"} onClick={function () { return handleClear(field.name); }} className="w-1/2">
                            {minutesRangeOptions.map(function (num) { return (<material_1.MenuItem key={num} value={num}>
                                {num}
                              </material_1.MenuItem>); })}
                          </CustomSelect_tsx_1.default>);
                }}/>
                    </div>
                    {errors.minuteFrom ? (<material_1.FormHelperText error>
                        {errors.minuteFrom.message}
                      </material_1.FormHelperText>) : errors.minuteTo ? (<material_1.FormHelperText error>
                        {errors.minuteTo.message}
                      </material_1.FormHelperText>) : null}
                    <material_1.FormControlLabel value="step" control={<material_1.Radio sx={radioSx}/>} label="Co */X minut" sx={formControlLabelSx}/>
                    <react_hook_form_1.Controller name="minuteStep" control={control} rules={{
                    validate: function (fieldValue) {
                        return (0, validateField_ts_1.default)(fieldValue, minuteType, "step", "Proszę wybrać co najmniej jedną minutę.");
                    },
                }} render={function (_a) {
                    var field = _a.field;
                    return (<CustomSelect_tsx_1.default {...field} value={Number(field.value)} disabled={minuteType !== "step"} onClick={function () { return handleClear(field.name); }} className="w-full">
                          {minutesStepOptions.map(function (num) { return (<material_1.MenuItem key={num} value={num}>
                              {num}
                            </material_1.MenuItem>); })}
                        </CustomSelect_tsx_1.default>);
                }}/>
                    {errors.minuteStep && (<material_1.FormHelperText error>
                        {errors.minuteStep.message}
                      </material_1.FormHelperText>)}
                    <material_1.FormControlLabel value="specificMinute" control={<material_1.Radio sx={radioSx}/>} label="Określona minuta (wybierz jedną lub więcej)" sx={formControlLabelSx}/>
                    <react_hook_form_1.Controller name="selectedMinutes" control={control} rules={{
                    validate: function (fieldValue) {
                        return (0, validateField_ts_1.default)(fieldValue, minuteType, "specificMinute", "Proszę wybrać co najmniej jedną minutę.");
                    },
                }} render={function (_a) {
                    var field = _a.field;
                    return (<>
                          <CustomSelect_tsx_1.default {...field} multiple={true} disabled={minuteType !== "specificMinute"} onClick={function () { return handleClear(field.name); }} className="w-full">
                            {minutesRangeOptions.map(function (num) { return (<material_1.MenuItem key={num} value={num}>
                                {num}
                              </material_1.MenuItem>); })}
                          </CustomSelect_tsx_1.default>
                          {errors.selectedMinutes && (<material_1.FormHelperText error>
                              {errors.selectedMinutes.message}
                            </material_1.FormHelperText>)}
                        </>);
                }}/>
                  </material_1.RadioGroup>);
        }}/>
            </div>
            <div>
              <material_1.Typography sx={{ fontFamily: "Inter", fontWeight: 600 }}>
                Godzina
              </material_1.Typography>
              <react_hook_form_1.Controller name="hourType" control={control} render={function (_a) {
            var field = _a.field;
            return (<material_1.RadioGroup {...field}>
                    <material_1.FormControlLabel value="every" control={<material_1.Radio sx={radioSx}/>} label="Każda godzina" sx={formControlLabelSx}/>
                    <material_1.FormControlLabel value="range" control={<material_1.Radio sx={radioSx}/>} label="Co godzinę między" sx={formControlLabelSx}/>
                    <div className="flex gap-2 mt-2">
                      <react_hook_form_1.Controller name="hourFrom" control={control} rules={{
                    validate: function (fieldValue) {
                        return (0, validateField_ts_1.default)(fieldValue, hourType, "range", "Proszę wybrać przedział godzin.");
                    },
                }} render={function (_a) {
                    var field = _a.field;
                    return (<CustomSelect_tsx_1.default {...field} value={Number(field.value)} disabled={hourType !== "range"} onClick={function () { return handleClear(field.name); }} className="w-1/2">
                            {hoursRangeOptions.map(function (num) { return (<material_1.MenuItem key={num} value={num}>
                                {num}
                              </material_1.MenuItem>); })}
                          </CustomSelect_tsx_1.default>);
                }}/>
                      <span className="flex items-center px-[11px]">-</span>
                      <react_hook_form_1.Controller name="hourTo" control={control} rules={{
                    validate: function (fieldValue) {
                        return (0, validateField_ts_1.default)(fieldValue, hourType, "range", "Proszę wybrać przedział godzin.");
                    },
                }} render={function (_a) {
                    var field = _a.field;
                    return (<CustomSelect_tsx_1.default {...field} value={Number(field.value)} disabled={hourType !== "range"} onClick={function () { return handleClear(field.name); }} className="w-1/2">
                            {hoursRangeOptions.map(function (num) { return (<material_1.MenuItem key={num} value={num}>
                                {num}
                              </material_1.MenuItem>); })}
                          </CustomSelect_tsx_1.default>);
                }}/>
                    </div>
                    {errors.hourFrom ? (<material_1.FormHelperText error>
                        {errors.hourFrom.message}
                      </material_1.FormHelperText>) : errors.hourTo ? (<material_1.FormHelperText error>
                        {errors.hourTo.message}
                      </material_1.FormHelperText>) : null}
                    <material_1.FormControlLabel value="step" control={<material_1.Radio sx={radioSx}/>} label="Co */X godzin" sx={formControlLabelSx}/>
                    <react_hook_form_1.Controller name="hourStep" control={control} rules={{
                    validate: function (fieldValue) {
                        return (0, validateField_ts_1.default)(fieldValue, hourType, "step", "Proszę wybrać co najmniej jedną godzinę.");
                    },
                }} render={function (_a) {
                    var field = _a.field;
                    return (<CustomSelect_tsx_1.default {...field} value={Number(field.value)} disabled={hourType !== "step"} onClick={function () { return handleClear(field.name); }} className="w-full">
                          {hoursStepOptions.map(function (num) { return (<material_1.MenuItem key={num} value={num}>
                              {num}
                            </material_1.MenuItem>); })}
                        </CustomSelect_tsx_1.default>);
                }}/>
                    {errors.hourStep && (<material_1.FormHelperText error>
                        {errors.hourStep.message}
                      </material_1.FormHelperText>)}
                    <material_1.FormControlLabel value="specificHour" control={<material_1.Radio sx={radioSx}/>} label="Określona godzina (wybierz jedną lub więcej)" sx={formControlLabelSx}/>
                    <react_hook_form_1.Controller name="selectedHours" control={control} rules={{
                    validate: function (fieldValue) {
                        return (0, validateField_ts_1.default)(fieldValue, hourType, "specificHour", "Proszę wybrać co najmniej jedną godzinę.");
                    },
                }} render={function (_a) {
                    var field = _a.field;
                    return (<CustomSelect_tsx_1.default {...field} multiple={true} disabled={hourType !== "specificHour"} onClick={function () { return handleClear(field.name); }}>
                          {hoursRangeOptions.map(function (num) { return (<material_1.MenuItem key={num} value={num}>
                              {num}
                            </material_1.MenuItem>); })}
                        </CustomSelect_tsx_1.default>);
                }}/>
                    {errors.selectedHours && (<material_1.FormHelperText error>
                        {errors.selectedHours.message}
                      </material_1.FormHelperText>)}
                  </material_1.RadioGroup>);
        }}/>
            </div>
          </div>
          <div className="border border-x-0 border-t-0 border-b-[#EFF1F5] pb-[22px]">
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div>
                <material_1.Typography sx={{ fontFamily: "Inter", fontWeight: 600 }}>
                  Dzień miesiąca
                </material_1.Typography>
                <react_hook_form_1.Controller name="dayType" control={control} render={function (_a) {
            var field = _a.field;
            return (<material_1.RadioGroup {...field}>
                      <material_1.FormControlLabel value="every" control={<material_1.Radio sx={radioSx}/>} label="Każdy dzień miesiąca" sx={formControlLabelSx}/>
                      <material_1.FormControlLabel value="specificDay" control={<material_1.Radio sx={radioSx}/>} label="Określony dzień miesiąca (wybierz jeden lub więcej)" sx={formControlLabelSx}/>
                    </material_1.RadioGroup>);
        }}/>
                <react_hook_form_1.Controller name="selectedDays" control={control} rules={{
            validate: function (fieldValue) {
                return (0, validateField_ts_1.default)(fieldValue, dayType, "specificDay", "Proszę wybrać co najmniej jeden dzień.");
            },
        }} render={function (_a) {
            var field = _a.field;
            return (<CustomSelect_tsx_1.default {...field} multiple={true} disabled={dayType !== "specificDay"} onClick={function () { return handleClear(field.name); }} className={"w-full"}>
                      {dayOptions.map(function (num) { return (<material_1.MenuItem key={num} value={num}>
                          {num}
                        </material_1.MenuItem>); })}
                    </CustomSelect_tsx_1.default>);
        }}/>
                {errors.selectedDays && (<material_1.FormHelperText error>
                    {errors.selectedDays.message}
                  </material_1.FormHelperText>)}
              </div>
              <div>
                <material_1.Typography sx={{ fontFamily: "Inter", fontWeight: 600 }}>
                  Miesiąc roku
                </material_1.Typography>
                <react_hook_form_1.Controller name="monthType" control={control} render={function (_a) {
            var field = _a.field;
            return (<material_1.RadioGroup {...field}>
                      <material_1.FormControlLabel value="every" control={<material_1.Radio sx={radioSx}/>} label="Każdy miesiąc roku" sx={formControlLabelSx}/>
                      <material_1.FormControlLabel value="specificMonth" control={<material_1.Radio sx={radioSx}/>} label="Określony miesiąc roku (wybierz jeden lub więcej)" sx={formControlLabelSx}/>
                    </material_1.RadioGroup>);
        }}/>
                <react_hook_form_1.Controller name="selectedMonths" control={control} rules={{
            validate: function (fieldValue) {
                return (0, validateField_ts_1.default)(fieldValue, monthType, "specificMonth", "Proszę wybrać co najmniej jeden miesiąc.");
            },
        }} render={function (_a) {
            var field = _a.field;
            return (<CustomSelect_tsx_1.default {...field} multiple={true} disabled={monthType !== "specificMonth"} onClick={function () { return handleClear(field.name); }} className={"w-full"}>
                      {monthOptions.map(function (num) { return (<material_1.MenuItem key={num} value={num}>
                          {num}
                        </material_1.MenuItem>); })}
                    </CustomSelect_tsx_1.default>);
        }}/>
                {errors.selectedMonths && (<material_1.FormHelperText error>
                    {errors.selectedMonths.message}
                  </material_1.FormHelperText>)}
              </div>
              <div>
                <material_1.Typography sx={{ fontFamily: "Inter", fontWeight: 600 }}>
                  Dzień tygodnia
                </material_1.Typography>
                <react_hook_form_1.Controller name="weekDayType" control={control} render={function (_a) {
            var field = _a.field;
            return (<material_1.RadioGroup {...field}>
                      <material_1.FormControlLabel value="every" control={<material_1.Radio sx={radioSx}/>} label="Każdy dzień tygodnia" sx={formControlLabelSx}/>
                      <material_1.FormControlLabel value="specificDayType" control={<material_1.Radio sx={radioSx}/>} label="Określony dzień tygodnia (wybierz jeden lub więcej)" sx={formControlLabelSx}/>
                    </material_1.RadioGroup>);
        }}/>
                <react_hook_form_1.Controller name="selectedWeekDays" control={control} rules={{
            validate: function (fieldValue) {
                return (0, validateField_ts_1.default)(fieldValue, weekDayType, "specificDayType", "Proszę wybrać co najmniej jeden miesiąc.");
            },
        }} render={function (_a) {
            var field = _a.field;
            return (<CustomSelect_tsx_1.default {...field} multiple={true} disabled={weekDayType !== "specificDayType"} onClick={function () { return handleClear(field.name); }} className={"w-full"}>
                      {weekDayOptions.map(function (num) { return (<material_1.MenuItem key={num} value={num}>
                          {num}
                        </material_1.MenuItem>); })}
                    </CustomSelect_tsx_1.default>);
        }}/>
                {errors.selectedWeekDays && (<material_1.FormHelperText error>
                    {errors.selectedWeekDays.message}
                  </material_1.FormHelperText>)}
              </div>
            </div>
          </div>
          <div className="mt-[22px] flex justify-end gap-4">
            <material_1.Button onClick={onClose}>Zamknij</material_1.Button>
            <material_1.Button variant="contained" type="submit">
              Ustaw
            </material_1.Button>
          </div>
        </div>
      </div>
    </form>);
};
exports.default = PatternForm;
