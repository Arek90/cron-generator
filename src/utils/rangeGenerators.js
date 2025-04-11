"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHoursRange = exports.generateMinutesRange = void 0;
var generateMinutesRange = function (minuteFrom, minuteTo) {
    var isNumber = function (value) { return typeof value === "number"; };
    if (isNumber(minuteFrom) && isNumber(minuteTo) && minuteFrom === minuteTo) {
        return "".concat(minuteFrom);
    }
    else if (isNumber(minuteFrom) &&
        isNumber(minuteTo) &&
        minuteFrom <= minuteTo) {
        return "".concat(minuteFrom, "-").concat(minuteTo);
    }
    else if (isNumber(minuteFrom) &&
        isNumber(minuteTo) &&
        minuteFrom > minuteTo) {
        if (minuteTo === 0) {
            return "".concat(minuteFrom, "-59,0");
        }
        else {
            return "".concat(minuteFrom, "-59,0-").concat(minuteTo);
        }
    }
    else if (isNumber(minuteFrom) && !minuteTo) {
        return "".concat(minuteFrom, "-");
    }
    else if (!minuteFrom && isNumber(minuteTo)) {
        return "-".concat(minuteTo);
    }
    else {
        return "-";
    }
};
exports.generateMinutesRange = generateMinutesRange;
var generateHoursRange = function (hourFrom, hourTo) {
    var isNumber = function (value) { return typeof value === "number"; };
    if (isNumber(hourFrom) && isNumber(hourTo) && hourFrom === hourTo) {
        return "".concat(hourFrom);
    }
    else if (isNumber(hourFrom) && isNumber(hourTo) && hourFrom <= hourTo) {
        return "".concat(hourFrom, "-").concat(hourTo);
    }
    else if (isNumber(hourFrom) && isNumber(hourTo) && hourFrom > hourTo) {
        if (hourTo === 0) {
            return "".concat(hourFrom, "-23,0");
        }
        else {
            return "".concat(hourFrom, "-23,0-").concat(hourTo);
        }
    }
    else if (isNumber(hourFrom) && !hourTo) {
        return "".concat(hourFrom, "-");
    }
    else if (!hourFrom && isNumber(hourTo)) {
        return "-".concat(hourTo);
    }
    else
        return "-";
};
exports.generateHoursRange = generateHoursRange;
