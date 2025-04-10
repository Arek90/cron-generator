import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import CustomSelect from "./CustomSelect.tsx";
import "@fontsource/inter";
import useCleanupOnTypeChange from "../customHooks/useCleanupOnTypeChange.ts";
import {
  generateHoursRange,
  generateMinutesRange,
} from "../utils/rangeGenerators.ts";
import validateField from "../utils/validateField.ts";

const radioSx = {
  "& .MuiSvgIcon-root": {
    fontSize: "20px",
  },
};

const formControlLabelSx = {
  "& .MuiFormControlLabel-label": {
    fontSize: "15px",
    fontFamily: "Inter",
  },
};

const minutesRangeOptions = Array.from({ length: 60 }, (_, i) => i);
const minutesStepOptions = Array.from({ length: 59 }, (_, i) => i + 1);
const hoursRangeOptions = Array.from({ length: 24 }, (_, i) => i);
const hoursStepOptions = Array.from({ length: 23 }, (_, i) => i + 1);
const dayOptions = Array.from({ length: 31 }, (_, i) => i + 1);
const monthOptions = [
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
const weekDayOptions = [
  "Poniedziałek",
  "Wtorek",
  "Środa",
  "Czwartek",
  "Piątek",
  "Sobota",
  "Niedziela",
];

type FormValues = {
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

interface PatternFormProps {
  onClose: () => void;
  onSubmit: (cronString: string) => void;
}

const PatternForm: React.FC<PatternFormProps> = ({ onClose, onSubmit }) => {
  const { control, handleSubmit, watch, formState, clearErrors, setValue } =
    useForm<FormValues>({
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
    });

  const { errors } = formState;

  const minuteType = watch("minuteType");
  const minuteFrom = watch("minuteFrom");
  const minuteTo = watch("minuteTo");
  const minuteStep = watch("minuteStep");
  const selectedMinutes = watch("selectedMinutes");

  const hourType = watch("hourType");
  const hourFrom = watch("hourFrom");
  const hourTo = watch("hourTo");
  const hourStep = watch("hourStep");
  const selectedHours = watch("selectedHours");

  const dayType = watch("dayType");
  const selectedDays = watch("selectedDays");
  const monthType = watch("monthType");
  const selectedMonths = watch("selectedMonths");
  const weekDayType = watch("weekDayType");
  const selectedWeekDays = watch("selectedWeekDays");

  const scheduleInput = watch("scheduleInput");

  const handleClear = (fieldName: string) => {
    const isArrayField = [
      "selectedMinutes",
      "selectedHours",
      "selectedDays",
      "selectedMonths",
      "selectedWeekDays",
    ].includes(fieldName);

    if (isArrayField) {
      setValue(fieldName, []);
    } else {
      setValue(fieldName, "");
    }
  };

  const useSetPattern = (
    {
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
    }: Pick<
      FormValues,
      | "minuteType"
      | "minuteFrom"
      | "minuteTo"
      | "minuteStep"
      | "selectedMinutes"
      | "hourType"
      | "hourFrom"
      | "hourTo"
      | "hourStep"
      | "selectedHours"
      | "dayType"
      | "selectedDays"
      | "monthType"
      | "selectedMonths"
      | "weekDayType"
      | "selectedWeekDays"
    >,
    setValue: (name: keyof FormValues, value: any) => void,
  ) => {
    useEffect(() => {
      const minutes =
        minuteType === "every"
          ? "*"
          : minuteType === "range"
            ? generateMinutesRange(minuteFrom, minuteTo)
            : minuteType === "step"
              ? `*/${minuteStep}`
              : minuteType === "specificMinute"
                ? selectedMinutes.sort((a, b) => a - b).join(",")
                : "*";

      const hours =
        hourType === "every"
          ? "*"
          : hourType === "range"
            ? generateHoursRange(hourFrom, hourTo)
            : hourType === "step"
              ? `*/${hourStep}`
              : hourType === "specificHour"
                ? selectedHours.sort((a, b) => a - b).join(",")
                : "*";

      const days =
        dayType === "every"
          ? "*"
          : dayType === "specificDay"
            ? selectedDays.sort((a, b) => a - b).join(",")
            : "*";

      const months =
        monthType === "every"
          ? "*"
          : monthType === "specificMonth"
            ? selectedMonths
                .map((selectedMonth) => monthOptions.indexOf(selectedMonth) + 1)
                .sort((a, b) => a - b)
                .join(",")
            : "*";

      const weekDays =
        weekDayType === "every"
          ? "*"
          : weekDayType === "specificDayType"
            ? selectedWeekDays
                .map(
                  (selectedWeekDay) =>
                    weekDayOptions.indexOf(selectedWeekDay) + 1,
                )
                .sort()
                .join(",")
            : "*";

      const cron = `${minutes} ${hours} ${days} ${months} ${weekDays}`;
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
  useCleanupOnTypeChange(
    minuteType,
    hourType,
    dayType,
    monthType,
    weekDayType,
    clearErrors,
  );

  const handleFormSubmit: SubmitHandler<FormValues> = (formData) => {
    console.log("Submitted schedule:", formData.scheduleInput);
    onSubmit(formData.scheduleInput);
    onClose();
  };
  useSetPattern(
    {
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
    },
    setValue,
  );

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex justify-center">
        <div className="w-[1440px] py-[50px] px-[70px] gap-[24px]">
          <div className="border border-x-0 border-t-0 border-b-[#EFF1F5] pb-[22px]">
            <Typography variant="h6" sx={{ fontFamily: "Inter" }}>
              Harmonogram
            </Typography>
            <Typography sx={{ fontSize: "30px" }}>{scheduleInput}</Typography>
          </div>
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div>
              <Typography sx={{ fontFamily: "Inter", fontWeight: 600 }}>
                Minuta
              </Typography>
              <Controller
                name="minuteType"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <FormControlLabel
                      value="every"
                      control={<Radio sx={radioSx} />}
                      label="Każda minuta"
                      sx={formControlLabelSx}
                    />
                    <FormControlLabel
                      value="range"
                      control={<Radio sx={radioSx} />}
                      label="Co minutę między"
                      sx={formControlLabelSx}
                    />
                    <div className="flex gap-2 mt-2">
                      <Controller
                        name="minuteFrom"
                        control={control}
                        rules={{
                          validate: (fieldValue) =>
                            validateField(
                              fieldValue,
                              minuteType,
                              "range",
                              "Proszę wybrać przedział minut.",
                            ),
                        }}
                        render={({ field }) => (
                          <CustomSelect
                            {...field}
                            disabled={minuteType !== "range"}
                            onClick={() => handleClear(field.name)}
                            className="w-1/2"
                          >
                            {minutesRangeOptions.map((num) => (
                              <MenuItem key={num} value={num}>
                                {num}
                              </MenuItem>
                            ))}
                          </CustomSelect>
                        )}
                      />
                      <span className="flex items-center px-[11px]">-</span>
                      <Controller
                        name="minuteTo"
                        control={control}
                        rules={{
                          validate: (fieldValue) =>
                            validateField(
                              fieldValue,
                              minuteType,
                              "range",
                              "Proszę wybrać przedział minut.",
                            ),
                        }}
                        render={({ field }) => (
                          <CustomSelect
                            {...field}
                            disabled={minuteType !== "range"}
                            onClick={() => handleClear(field.name)}
                            className="w-1/2"
                          >
                            {minutesRangeOptions.map((num) => (
                              <MenuItem key={num} value={num}>
                                {num}
                              </MenuItem>
                            ))}
                          </CustomSelect>
                        )}
                      />
                    </div>
                    {errors.minuteFrom ? (
                      <FormHelperText error>
                        {errors.minuteFrom.message}
                      </FormHelperText>
                    ) : errors.minuteTo ? (
                      <FormHelperText error>
                        {errors.minuteTo.message}
                      </FormHelperText>
                    ) : null}
                    <FormControlLabel
                      value="step"
                      control={<Radio sx={radioSx} />}
                      label="Co */X minut"
                      sx={formControlLabelSx}
                    />
                    <Controller
                      name="minuteStep"
                      control={control}
                      rules={{
                        validate: (fieldValue) =>
                          validateField(
                            fieldValue,
                            minuteType,
                            "step",
                            "Proszę wybrać co najmniej jedną minutę.",
                          ),
                      }}
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          disabled={minuteType !== "step"}
                          onClick={() => handleClear(field.name)}
                          className="w-full"
                        >
                          {minutesStepOptions.map((num) => (
                            <MenuItem key={num} value={num}>
                              {num}
                            </MenuItem>
                          ))}
                        </CustomSelect>
                      )}
                    />
                    {errors.minuteStep && (
                      <FormHelperText error>
                        {errors.minuteStep.message}
                      </FormHelperText>
                    )}
                    <FormControlLabel
                      value="specificMinute"
                      control={<Radio sx={radioSx} />}
                      label="Określona minuta (wybierz jedną lub więcej)"
                      sx={formControlLabelSx}
                    />
                    <Controller
                      name="selectedMinutes"
                      control={control}
                      rules={{
                        validate: (fieldValue) =>
                          validateField(
                            fieldValue,
                            minuteType,
                            "specificMinute",
                            "Proszę wybrać co najmniej jedną minutę.",
                          ),
                      }}
                      render={({ field }) => (
                        <>
                          <CustomSelect
                            {...field}
                            multiple={true}
                            disabled={minuteType !== "specificMinute"}
                            onClick={() => handleClear(field.name)}
                            className="w-full"
                          >
                            {minutesRangeOptions.map((num) => (
                              <MenuItem key={num} value={num}>
                                {num}
                              </MenuItem>
                            ))}
                          </CustomSelect>
                          {errors.selectedMinutes && (
                            <FormHelperText error>
                              {errors.selectedMinutes.message}
                            </FormHelperText>
                          )}
                        </>
                      )}
                    />
                  </RadioGroup>
                )}
              />
            </div>
            <div>
              <Typography sx={{ fontFamily: "Inter", fontWeight: 600 }}>
                Godzina
              </Typography>
              <Controller
                name="hourType"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <FormControlLabel
                      value="every"
                      control={<Radio sx={radioSx} />}
                      label="Każda godzina"
                      sx={formControlLabelSx}
                    />
                    <FormControlLabel
                      value="range"
                      control={<Radio sx={radioSx} />}
                      label="Co godzinę między"
                      sx={formControlLabelSx}
                    />
                    <div className="flex gap-2 mt-2">
                      <Controller
                        name="hourFrom"
                        control={control}
                        rules={{
                          validate: (fieldValue) =>
                            validateField(
                              fieldValue,
                              hourType,
                              "range",
                              "Proszę wybrać przedział godzin.",
                            ),
                        }}
                        render={({ field }) => (
                          <CustomSelect
                            {...field}
                            disabled={hourType !== "range"}
                            onClick={() => handleClear(field.name)}
                            className="w-1/2"
                          >
                            {hoursRangeOptions.map((num) => (
                              <MenuItem key={num} value={num}>
                                {num}
                              </MenuItem>
                            ))}
                          </CustomSelect>
                        )}
                      />
                      <span className="flex items-center px-[11px]">-</span>
                      <Controller
                        name="hourTo"
                        control={control}
                        rules={{
                          validate: (fieldValue) =>
                            validateField(
                              fieldValue,
                              hourType,
                              "range",
                              "Proszę wybrać przedział godzin.",
                            ),
                        }}
                        render={({ field }) => (
                          <CustomSelect
                            {...field}
                            disabled={hourType !== "range"}
                            onClick={() => handleClear(field.name)}
                            className="w-1/2"
                          >
                            {hoursRangeOptions.map((num) => (
                              <MenuItem key={num} value={num}>
                                {num}
                              </MenuItem>
                            ))}
                          </CustomSelect>
                        )}
                      />
                    </div>
                    {errors.hourFrom ? (
                      <FormHelperText error>
                        {errors.hourFrom.message}
                      </FormHelperText>
                    ) : errors.hourTo ? (
                      <FormHelperText error>
                        {errors.hourTo.message}
                      </FormHelperText>
                    ) : null}
                    <FormControlLabel
                      value="step"
                      control={<Radio sx={radioSx} />}
                      label="Co */X godzin"
                      sx={formControlLabelSx}
                    />
                    <Controller
                      name="hourStep"
                      control={control}
                      rules={{
                        validate: (fieldValue) =>
                          validateField(
                            fieldValue,
                            hourType,
                            "step",
                            "Proszę wybrać co najmniej jedną godzinę.",
                          ),
                      }}
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          disabled={hourType !== "step"}
                          onClick={() => handleClear(field.name)}
                          className="w-full"
                        >
                          {hoursStepOptions.map((num) => (
                            <MenuItem key={num} value={num}>
                              {num}
                            </MenuItem>
                          ))}
                        </CustomSelect>
                      )}
                    />
                    {errors.hourStep && (
                      <FormHelperText error>
                        {errors.hourStep.message}
                      </FormHelperText>
                    )}
                    <FormControlLabel
                      value="specificHour"
                      control={<Radio sx={radioSx} />}
                      label="Określona godzina (wybierz jedną lub więcej)"
                      sx={formControlLabelSx}
                    />
                    <Controller
                      name="selectedHours"
                      control={control}
                      rules={{
                        validate: (fieldValue) =>
                          validateField(
                            fieldValue,
                            hourType,
                            "specificHour",
                            "Proszę wybrać co najmniej jedną godzinę.",
                          ),
                      }}
                      render={({ field }) => (
                        <CustomSelect
                          {...field}
                          multiple={true}
                          disabled={hourType !== "specificHour"}
                          onClick={() => handleClear(field.name)}
                        >
                          {hoursRangeOptions.map((num) => (
                            <MenuItem key={num} value={num}>
                              {num}
                            </MenuItem>
                          ))}
                        </CustomSelect>
                      )}
                    />
                    {errors.selectedHours && (
                      <FormHelperText error>
                        {errors.selectedHours.message}
                      </FormHelperText>
                    )}
                  </RadioGroup>
                )}
              />
            </div>
          </div>
          <div className="border border-x-0 border-t-0 border-b-[#EFF1F5] pb-[22px]">
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div>
                <Typography sx={{ fontFamily: "Inter", fontWeight: 600 }}>
                  Dzień miesiąca
                </Typography>
                <Controller
                  name="dayType"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <FormControlLabel
                        value="every"
                        control={<Radio sx={radioSx} />}
                        label="Każdy dzień miesiąca"
                        sx={formControlLabelSx}
                      />
                      <FormControlLabel
                        value="specificDay"
                        control={<Radio sx={radioSx} />}
                        label="Określony dzień miesiąca (wybierz jeden lub więcej)"
                        sx={formControlLabelSx}
                      />
                    </RadioGroup>
                  )}
                />
                <Controller
                  name="selectedDays"
                  control={control}
                  rules={{
                    validate: (fieldValue) =>
                      validateField(
                        fieldValue,
                        dayType,
                        "specificDay",
                        "Proszę wybrać co najmniej jeden dzień.",
                      ),
                  }}
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      multiple={true}
                      disabled={dayType !== "specificDay"}
                      onClick={() => handleClear(field.name)}
                      className={"w-full"}
                    >
                      {dayOptions.map((num) => (
                        <MenuItem key={num} value={num}>
                          {num}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                  )}
                />
                {errors.selectedDays && (
                  <FormHelperText error>
                    {errors.selectedDays.message}
                  </FormHelperText>
                )}
              </div>
              <div>
                <Typography sx={{ fontFamily: "Inter", fontWeight: 600 }}>
                  Miesiąc roku
                </Typography>
                <Controller
                  name="monthType"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <FormControlLabel
                        value="every"
                        control={<Radio sx={radioSx} />}
                        label="Każdy miesiąc roku"
                        sx={formControlLabelSx}
                      />
                      <FormControlLabel
                        value="specificMonth"
                        control={<Radio sx={radioSx} />}
                        label="Określony miesiąc roku (wybierz jeden lub więcej)"
                        sx={formControlLabelSx}
                      />
                    </RadioGroup>
                  )}
                />
                <Controller
                  name="selectedMonths"
                  control={control}
                  rules={{
                    validate: (fieldValue) =>
                      validateField(
                        fieldValue,
                        monthType,
                        "specificMonth",
                        "Proszę wybrać co najmniej jeden miesiąc.",
                      ),
                  }}
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      multiple={true}
                      disabled={monthType !== "specificMonth"}
                      onClick={() => handleClear(field.name)}
                      className={"w-full"}
                    >
                      {monthOptions.map((num) => (
                        <MenuItem key={num} value={num}>
                          {num}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                  )}
                />
                {errors.selectedMonths && (
                  <FormHelperText error>
                    {errors.selectedMonths.message}
                  </FormHelperText>
                )}
              </div>
              <div>
                <Typography sx={{ fontFamily: "Inter", fontWeight: 600 }}>
                  Dzień tygodnia
                </Typography>
                <Controller
                  name="weekDayType"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <FormControlLabel
                        value="every"
                        control={<Radio sx={radioSx} />}
                        label="Każdy dzień tygodnia"
                        sx={formControlLabelSx}
                      />
                      <FormControlLabel
                        value="specificDayType"
                        control={<Radio sx={radioSx} />}
                        label="Określony dzień tygodnia (wybierz jeden lub więcej)"
                        sx={formControlLabelSx}
                      />
                    </RadioGroup>
                  )}
                />
                <Controller
                  name="selectedWeekDays"
                  control={control}
                  rules={{
                    validate: (fieldValue) =>
                      validateField(
                        fieldValue,
                        weekDayType,
                        "specificDayType",
                        "Proszę wybrać co najmniej jeden miesiąc.",
                      ),
                  }}
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      multiple={true}
                      disabled={weekDayType !== "specificDayType"}
                      onClick={() => handleClear(field.name)}
                      className={"w-full"}
                    >
                      {weekDayOptions.map((num) => (
                        <MenuItem key={num} value={num}>
                          {num}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                  )}
                />
                {errors.selectedWeekDays && (
                  <FormHelperText error>
                    {errors.selectedWeekDays.message}
                  </FormHelperText>
                )}
              </div>
            </div>
          </div>
          <div className="mt-[22px] flex justify-end gap-4">
            <Button onClick={onClose}>Zamknij</Button>
            <Button variant="contained" type="submit">
              Ustaw
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PatternForm;
