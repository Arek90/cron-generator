"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validateField = function (fieldValue, fieldType, typeCondition, errorMessage) {
    if (fieldType === typeCondition) {
        if (["range", "step"].includes(typeCondition) &&
            typeof fieldValue !== "number") {
            return errorMessage;
        }
        if (typeCondition.startsWith("specific") &&
            Array.isArray(fieldValue) &&
            fieldValue.length === 0) {
            return errorMessage;
        }
    }
    return true;
};
exports.default = validateField;
