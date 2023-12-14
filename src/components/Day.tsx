import { useEffect, useState } from "react";
import { Divider, Typography, MenuItem } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { SessionArrayType, SessionType } from "../types/SessionType";

interface Props {
  date: Date;
  data: SessionArrayType;
  setOpenSessionItem: (setOpenSessionItem: boolean) => void;
}

function Day(props: Props) {
  const theme = useTheme();

  const dateName =
    props.date.toLocaleDateString("de-DE", { weekday: "long" }).slice(0, 2) +
    ".";
  const dateDay = props.date.getDate();
  const dateMonth = props.date.getMonth() + 1;

  const date = new Date();
  let highlight = "transparent";
  let highlightTextColor = undefined;
  if (dateDay === date.getDate() && dateMonth === date.getMonth() + 1) {
    highlight = theme.palette.primary.main;
    highlightTextColor = theme.palette.primary.contrastText;
  }

  const [worked, setWorked] = useState(0);
  const handleWorkedHours = () => {
    let count = 0;

    props.data.forEach((value: SessionType) => {
      count = count + getDifference(value.start, value.end);
    });
    return count;
  };

  const getDifference = (start: number, end: number) => {
    const difference = end - start;
    return Math.round(difference / 60 / 60 / 1000);
  };

  useEffect(() => {
    setWorked(handleWorkedHours());
  }, [props.data]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        alignItems: "center",
        userSelect: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          userSelect: "none",
          flexGrow: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            borderRadius: "4px",
            backgroundColor: highlight,
            color: highlightTextColor,
          }}
        >
          <Typography>{dateName}</Typography>
          <Typography>
            {dateDay}.{dateMonth}
          </Typography>
        </div>
        <Divider flexItem />
        {props.data.map((data: SessionType, index: number) => {
          const difference = getDifference(data.start, data.end);
          return (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: difference + "0%",
                width: "90%",
                margin: "2px",
                backgroundColor: data.color,
                borderRadius: "6px",
                color: theme.palette.primary.contrastText,
              }}
            >
              <MenuItem
                onClick={() => props.setOpenSessionItem(true)}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0px",
                  padding: "0px",
                  width: "100%",
                  height: "100%",
                  borderRadius: "6px",
                }}
              >
                {difference + "Std."}
              </MenuItem>
            </div>
          );
        })}
      </div>
      <Divider flexItem />
      <Typography>{worked + " Std."}</Typography>
    </div>
  );
}

export default Day;
