import React from "react";
import { IconButton, Select, SelectChangeEvent } from "@mui/material";
import { LuChevronsUpDown } from "react-icons/lu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

type CustomSelectProps = {
  multiple?: true;
  disabled?: boolean;
  name: string;
  value: string | number[] | number;
  onChange: (event: SelectChangeEvent<number[]>) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
};

const CustomSelect = ({
  multiple,
  disabled = false,
  children,
  name,
  value,
  onChange,
  onBlur,
  onClick,
  className = "",
  ...rest
}: CustomSelectProps) => (
  <Select
    name={name}
    value={value as number[]}
    onBlur={onBlur}
    onChange={onChange}
    multiple={multiple}
    disabled={disabled}
    IconComponent={LuChevronsUpDown}
    displayEmpty
    className={`rounded-md ${className}`}
    endAdornment={
      Array.isArray(value) &&
      value.length !== 0 && (
        <div className="pr-[6px]">
          <IconButton onClick={onClick}>
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </div>
      )
    }
    MenuProps={{
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
    }}
    sx={{
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
    }}
    {...rest}
  >
    {children}
  </Select>
);

export default CustomSelect;
