import { useEffect } from "react";
import { Divider, Typography } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { SessionArrayType, SessionType } from "../types/SessionType";
import SessionItem from "./SessionItem";

interface Props {
  date: Date;
  data: SessionArrayType;
  setOpenSessionItem: (setOpenSessionItem: boolean, data: SessionType) => void;
  worked: number;
  setWorked: (worked: number) => void;
  currentSessionId: string;
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

  const handleWorkedHours = () => {
    let count = 0;

    props.data.forEach((value: SessionType) => {
      count = count + getDifference(value.start, value.end);
    });
    return count;
  };

  const getDifference = (start: number, end: number) => {
    const difference = end - start;
    const format = difference / 60 / 60 / 1000;
    const stringFormatArray = (format + "").split(".");
    const stringFormat = parseInt(stringFormatArray[0]);
    const decimalPlace = parseFloat("0." + stringFormatArray[1]);
    if (decimalPlace >= 0.15 && decimalPlace < 0.35) {
      return stringFormat + 0.25;
    } else if (decimalPlace >= 0.35 && decimalPlace < 0.6) {
      return stringFormat + 0.5;
    } else if (decimalPlace >= 0.6 && decimalPlace < 0.9) {
      return stringFormat + 0.75;
    } else {
      return stringFormat;
    }
  };

  useEffect(() => {
    props.setWorked(handleWorkedHours());
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
          let height = "";
          if (difference < 1) {
            height = "10%";
          } else {
            height = difference + "0%";
          }
          return (
            <SessionItem
              key={index}
              index={index}
              setOpenSessionItem={props.setOpenSessionItem}
              height={height}
              difference={difference}
              data={data}
              currentSessionId={props.currentSessionId}
            />
          );
        })}
      </div>
      <Divider flexItem />
      <Typography>{props.worked + " Std."}</Typography>
    </div>
  );
}

export default Day;
