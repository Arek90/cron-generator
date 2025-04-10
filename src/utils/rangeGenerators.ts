const generateMinutesRange = (
  minuteFrom: number | string,
  minuteTo: number | string,
): string => {
  const isNumber = (value: string | number) => typeof value === "number";

  if (isNumber(minuteFrom) && isNumber(minuteTo) && minuteFrom === minuteTo) {
    return `${minuteFrom}`;
  } else if (
    isNumber(minuteFrom) &&
    isNumber(minuteTo) &&
    minuteFrom <= minuteTo
  ) {
    return `${minuteFrom}-${minuteTo}`;
  } else if (
    isNumber(minuteFrom) &&
    isNumber(minuteTo) &&
    minuteFrom > minuteTo
  ) {
    if (minuteTo === 0) {
      return `${minuteFrom}-59,0`;
    } else {
      return `${minuteFrom}-59,0-${minuteTo}`;
    }
  } else if (isNumber(minuteFrom) && !minuteTo) {
    return `${minuteFrom}-`;
  } else if (!minuteFrom && isNumber(minuteTo)) {
    return `-${minuteTo}`;
  } else {
    return "-";
  }
};

const generateHoursRange = (
  hourFrom: number | string,
  hourTo: number | string,
): string => {
  const isNumber = (value: string | number) => typeof value === "number";

  if (isNumber(hourFrom) && isNumber(hourTo) && hourFrom === hourTo) {
    return `${hourFrom}`;
  } else if (isNumber(hourFrom) && isNumber(hourTo) && hourFrom <= hourTo) {
    return `${hourFrom}-${hourTo}`;
  } else if (isNumber(hourFrom) && isNumber(hourTo) && hourFrom > hourTo) {
    if (hourTo === 0) {
      return `${hourFrom}-23,0`;
    } else {
      return `${hourFrom}-23,0-${hourTo}`;
    }
  } else if (isNumber(hourFrom) && !hourTo) {
    return `${hourFrom}-`;
  } else if (!hourFrom && isNumber(hourTo)) {
    return `-${hourTo}`;
  } else return "-";
};

export { generateMinutesRange, generateHoursRange };
