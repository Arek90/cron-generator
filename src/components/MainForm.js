"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var material_1 = require("@mui/material");
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var go_1 = require("react-icons/go");
var rx_1 = require("react-icons/rx");
var pi_1 = require("react-icons/pi");
require("@fontsource/inter");
var CloseRounded_1 = __importDefault(require("@mui/icons-material/CloseRounded"));
var Ccig_tsx_1 = __importDefault(require("./Ccig.tsx"));
var PatternForm_tsx_1 = __importDefault(require("./PatternForm.tsx"));
var appBarSx = {
    backgroundColor: "#31363E",
    padding: 1,
    marginBottom: "22px",
};
var textFieldSx = {
    "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#E8EBF0" },
        "&:hover fieldset": { borderColor: "#E8EBF0" },
        "&.Mui-focused fieldset": { borderColor: "#E8EBF0" },
    },
    "& .MuiInputLabel-root": { color: "black" },
    "& .MuiInputLabel-root.Mui-focused": { color: "black" },
    "& .MuiInputBase-input": {
        height: "12px",
    },
};
var buttonSx = {
    borderColor: "#DBDBDB",
    width: "18%",
    textTransform: "none",
    lineHeight: "100%",
    fontSize: "12px",
    height: "40px",
    fontFamily: "Inter",
    fontWeight: 500,
    paddingX: 6,
};
var iconSx = { height: "16px", width: "16px" };
var MainForm = function () {
    var _a = (0, react_hook_form_1.useForm)({
        defaultValues: {
            name: "Harmonogram_1",
            command: "app:remove:cron:report",
            schedule: "*****",
        },
    }), register = _a.register, handleSubmit = _a.handleSubmit, setValue = _a.setValue;
    var _b = (0, react_1.useState)(false), openPatternForm = _b[0], setOpenPatternForm = _b[1];
    var onSubmit = function (pattern) { return setValue("schedule", pattern); };
    var handleOpenPatternFrom = function () { return setOpenPatternForm(true); };
    var handleClosePatternFrom = function () { return setOpenPatternForm(false); };
    return (<material_1.Box>
      <material_1.AppBar position="static" sx={appBarSx}>
        <material_1.Toolbar className="flex justify-between">
          <material_1.Typography variant="h6">
            <Ccig_tsx_1.default />
          </material_1.Typography>
          <material_1.Box sx={{
            flex: "1 1 auto",
            display: "flex",
            justifyContent: "center",
            gap: 4,
        }}>
            {["Sprzedaże", "Statystyki", "Baza", "Kampania", "Projekt"].map(function (label) { return (<material_1.Button key={label} color="inherit">
                  <div className="normal-case pr-[11px]">{label}</div>
                  <go_1.GoChevronDown />
                </material_1.Button>); })}
          </material_1.Box>
          <material_1.Box sx={{ flex: "0 0 auto" }}>
            <rx_1.RxPerson />
          </material_1.Box>
        </material_1.Toolbar>
      </material_1.AppBar>
      <div className="flex justify-center">
        <div className="w-full min-w-md max-w-xs xs:max-w-[520px] sm:max-w-[520px] md:max-w-[640px] lg:max-w-[960px]">
          <div className="flex items-center gap-[11px] mb-[22px]">
            <pi_1.PiDotsNine />
            <material_1.Typography variant={"h5"} sx={{ fontFamily: "Inter", fontWeight: 600, color: "#14181F" }}>
              Cron
            </material_1.Typography>
          </div>
          <div className="flex justify-center flex-col p-[24px] gap-[24px] p-6 border rounded-xl border-[#EFF1F5]">
            <div className="flex justify-between items-center border border-x-0 border-t-0 border-b-[#EFF1F5] pb-[22px]">
              <div className="flex items-center gap-[11px]">
                <pi_1.PiDotsSixVertical />
                <material_1.Typography sx={{ fontFamily: "Inter", fontWeight: 400 }}>
                  Harmonogram
                </material_1.Typography>
              </div>
              <div className="flex justify-end gap-2">
                <material_1.Button variant="outlined" sx={__assign(__assign({}, buttonSx), { color: "black" })}>
                  <div className="flex items-center gap-[4px]">
                    <CloseRounded_1.default sx={iconSx}/>
                    Zamknij
                  </div>
                </material_1.Button>
                <material_1.Button variant="contained" sx={__assign(__assign({}, buttonSx), { backgroundColor: "#5699F6" })}>
                  <div className="flex items-center gap-[4px]">
                    <CloseRounded_1.default sx={iconSx}/>
                    Zapisz
                  </div>
                </material_1.Button>
              </div>
            </div>
            <form onSubmit={handleSubmit(function () { })} className="bg-[#FCFCFD] flex flex-col gap-[22px] pb-[11px]">
              <div className="flex gap-4 mb-4">
                <material_1.TextField {...register("name")} label="Nazwa" className="w-1/2" sx={textFieldSx}/>
                <material_1.TextField {...register("command")} label="Komenda" className="w-1/2" sx={textFieldSx}/>
              </div>
              <div className="mb-4">
                <material_1.TextField {...register("schedule")} label="Harmonogram" type="text" fullWidth sx={textFieldSx}/>
              </div>
              <material_1.Button type="button" variant="outlined" onClick={handleOpenPatternFrom} sx={__assign(__assign({}, buttonSx), { color: "black", backgroundColor: "#EFF1F5", paddingX: "4px" })}>
                Ustaw harmonogram
              </material_1.Button>
              <material_1.Dialog open={openPatternForm} slotProps={{
            paper: {
                sx: {
                    maxWidth: "none",
                },
            },
        }}>
                <PatternForm_tsx_1.default onSubmit={onSubmit} onClose={handleClosePatternFrom}/>
              </material_1.Dialog>
            </form>
          </div>
        </div>
      </div>
    </material_1.Box>);
};
exports.default = MainForm;
