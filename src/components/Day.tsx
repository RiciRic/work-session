import { useEffect, useState } from "react";
import { Divider, Typography } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import SessionType, { DataType } from "../types/SessionType";

interface Props {
  date: Date;
  data: any;
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

    props.data.forEach((value: any) => {
      const difference = value.end - value.start;
      count = count + difference;
    });
    return count;
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
        {props.data.map((data: any, index: number) => {
          const difference = data.end - data.start;
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
              {difference + "Std."}
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
