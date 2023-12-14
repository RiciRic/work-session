import { Typography } from "@mui/material";

function getCalendarWeek() {
  var date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  var week1 = new Date(date.getFullYear(), 0, 4);
  var result =
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    );
  return result;
}

function getCurrentDate() {
  var date = new Date();
  date.setHours(0, 0, 0, 0);
  return date.toLocaleDateString("de-DE");
}

function CalendarWeek() {
  const cw = getCalendarWeek();
  const currentDate = getCurrentDate();
  return (
    <div
      style={{
        width: "70px",
        color: "#7C7C7D",
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
      }}
    >
      <Typography variant="subtitle2">{currentDate}</Typography>
      <Typography variant="subtitle2">KW {cw}</Typography>
    </div>
  );
}

export default CalendarWeek;
