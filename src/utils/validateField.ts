type FieldType =
  | "every"
  | "range"
  | "step"
  | "specificMinute"
  | "specificHour"
  | "specificDay"
  | "specificMonth"
  | "specificDayType";

type FieldValue = string | number | number[];

const validateField = (
  fieldValue: FieldValue,
  fieldType: FieldType,
  typeCondition: FieldType,
  errorMessage: string,
): true | string => {
  if (fieldType === typeCondition) {
    if (
      ["range", "step"].includes(typeCondition) &&
      typeof fieldValue !== "number"
    ) {
      return errorMessage;
    }

    if (
      typeCondition.startsWith("specific") &&
      Array.isArray(fieldValue) &&
      fieldValue.length === 0
    ) {
      return errorMessage;
    }
  }

  return true;
};

export default validateField;
