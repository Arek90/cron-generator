import {
  AppBar,
  Box,
  Button,
  Dialog,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { GoChevronDown } from "react-icons/go";
import { RxPerson } from "react-icons/rx";
import { PiDotsNine, PiDotsSixVertical } from "react-icons/pi";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Ccig from "./Ccig.tsx";
import PatternForm from "./PatternForm.tsx";

const appBarSx = {
  backgroundColor: "#31363E",
  padding: 1,
  marginBottom: "22px",
};

const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#E8EBF0" },
    "&:hover fieldset": { borderColor: "#E8EBF0" },
    "&.Mui-focused fieldset": { borderColor: "#E8EBF0" },
    fontFamily: "Inter",
  },
  "& .MuiInputLabel-root": { color: "black", fontFamily: "Inter" },
  "& .MuiInputLabel-root.Mui-focused": { color: "black" },
  "& .MuiInputBase-input": {
    height: "12px",
  },
};

const buttonSx = {
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

const iconSx = { height: "16px", width: "16px" };

type FormData = {
  name: string;
  command: string;
  schedule: string;
};

const MainForm = () => {
  const { register, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      name: "Harmonogram_1",
      command: "app:remove:cron:report",
      schedule: "*****",
    },
  });
  const [openPatternForm, setOpenPatternForm] = useState<boolean>(false);

  const onSubmit = (pattern: string) => setValue("schedule", pattern);

  const handleOpenPatternFrom = () => setOpenPatternForm(true);
  const handleClosePatternFrom = () => setOpenPatternForm(false);

  return (
    <Box>
      <AppBar position="static" sx={appBarSx}>
        <Toolbar className="flex justify-between">
          <Typography variant="h6">
            <Ccig />
          </Typography>
          <Box
            sx={{
              flex: "1 1 auto",
              display: "flex",
              justifyContent: "center",
              gap: 4,
            }}
          >
            {["Sprzedaże", "Statystyki", "Baza", "Kampania", "Projekt"].map(
              (label) => (
                <Button key={label} color="inherit">
                  <div className="normal-case pr-[11px]">{label}</div>
                  <GoChevronDown />
                </Button>
              ),
            )}
          </Box>
          <Box sx={{ flex: "0 0 auto" }}>
            <RxPerson />
          </Box>
        </Toolbar>
      </AppBar>
      <div className="flex justify-center">
        <div className="w-full min-w-md max-w-xs xs:max-w-[520px] sm:max-w-[520px] md:max-w-[640px] lg:max-w-[960px]">
          <div className="flex items-center gap-[11px] mb-[22px]">
            <PiDotsNine />
            <Typography
              variant={"h5"}
              sx={{ fontFamily: "Inter", fontWeight: 600, color: "#14181F" }}
            >
              Cron
            </Typography>
          </div>
          <div className="flex justify-center flex-col p-[24px] gap-[24px] p-6 border rounded-xl border-[#EFF1F5]">
            <div className="flex justify-between items-center border border-x-0 border-t-0 border-b-[#EFF1F5] pb-[22px]">
              <div className="flex items-center gap-[11px]">
                <PiDotsSixVertical />
                <Typography sx={{ fontFamily: "Inter", fontWeight: 400 }}>
                  Harmonogram
                </Typography>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outlined" sx={{ ...buttonSx, color: "black" }}>
                  <div className="flex items-center gap-[4px]">
                    <CloseRoundedIcon sx={iconSx} />
                    Zamknij
                  </div>
                </Button>
                <Button
                  variant="contained"
                  sx={{ ...buttonSx, backgroundColor: "#5699F6" }}
                >
                  <div className="flex items-center gap-[4px]">
                    <CloseRoundedIcon sx={iconSx} />
                    Zapisz
                  </div>
                </Button>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(() => {})}
              className="bg-[#FCFCFD] flex flex-col gap-[22px] pb-[11px]"
            >
              <div className="flex gap-4 mb-4">
                <TextField
                  {...register("name")}
                  label="Nazwa"
                  className="w-1/2"
                  sx={textFieldSx}
                />
                <TextField
                  {...register("command")}
                  label="Komenda"
                  className="w-1/2"
                  sx={textFieldSx}
                />
              </div>
              <div className="mb-4">
                <TextField
                  {...register("schedule")}
                  label="Harmonogram"
                  type="text"
                  fullWidth
                  sx={textFieldSx}
                />
              </div>
              <Button
                type="button"
                variant="outlined"
                onClick={handleOpenPatternFrom}
                sx={{
                  ...buttonSx,
                  color: "black",
                  backgroundColor: "#EFF1F5",
                  paddingX: "4px",
                }}
              >
                Ustaw harmonogram
              </Button>
              <Dialog
                open={openPatternForm}
                slotProps={{
                  paper: {
                    sx: {
                      maxWidth: "none",
                    },
                  },
                }}
              >
                <PatternForm
                  onSubmit={onSubmit}
                  onClose={handleClosePatternFrom}
                />
              </Dialog>
            </form>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default MainForm;
