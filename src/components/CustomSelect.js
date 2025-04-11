"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
var lu_1 = require("react-icons/lu");
var CloseRounded_1 = __importDefault(require("@mui/icons-material/CloseRounded"));
var CustomSelect = function (_a) {
    var multiple = _a.multiple, _b = _a.disabled, disabled = _b === void 0 ? false : _b, children = _a.children, name = _a.name, value = _a.value, onChange = _a.onChange, onBlur = _a.onBlur, onClick = _a.onClick, _c = _a.className, className = _c === void 0 ? "" : _c, rest = __rest(_a, ["multiple", "disabled", "children", "name", "value", "onChange", "onBlur", "onClick", "className"]);
    return (<material_1.Select name={name} value={Array.isArray(value) ? value : value === undefined ? undefined : [value]} onBlur={onBlur} onChange={onChange} multiple={multiple} disabled={disabled} IconComponent={lu_1.LuChevronsUpDown} displayEmpty className={"rounded-md ".concat(className)} endAdornment={
        // value.length !== 0 && (
        Array.isArray(value) &&
            value.length !== 0 && (<div className="pr-[6px]">
          <material_1.IconButton onClick={onClick}>
            <CloseRounded_1.default fontSize="small"/>
          </material_1.IconButton>
        </div>)} MenuProps={{
            PaperProps: {
                className: "rounded-xl shadow-xl border border-gray-200",
                sx: {
                    maxHeight: 300,
                    mt: 1,
                    overflowY: "auto",
                },
            },
            anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
            },
            transformOrigin: {
                vertical: "top",
                horizontal: "left",
            },
        }} sx={{
            "& .MuiSelect-select": {
                padding: "10px",
                minHeight: "40px",
                display: "flex",
                alignItems: "center",
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
                borderColor: "yellow",
                boxShadow: "0 0 0 5px red;",
            },
        }} {...rest}>
    {children}
  </material_1.Select>);
};
exports.default = CustomSelect;
