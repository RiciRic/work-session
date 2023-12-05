import { useState, useEffect } from "react";
import { Alert, MenuItem } from "@mui/material";
import getNumberMonth from "../files/getNumberMonth";

import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/api/notification";

import getWeek from "../files/getWeek";
import openAdTime from "../files/openAdTime";

async function createNotification(title: string, body: string) {
  let permissionGranted = await isPermissionGranted();
  if (!permissionGranted) {
    const permission = await requestPermission();
    permissionGranted = permission === "granted";
  }
  if (permissionGranted) {
    sendNotification({ title: title, body: body });
  }
}

function Warning() {
  const [show, setShow] = useState(false);
  const [showBeforeWeekend, setShowBeforeWeekend] = useState(false);
  const [daysLabel, setDaysLabel] = useState("Tage");
  const [daysUntilEndOfMonth, setDaysUntilEndOfMonth] = useState(0);

  const notify = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    console.log("year: " + year + ", month: " + month, ", day: ", day);
    const numberMonth = getNumberMonth(year, month);
    console.log("numberMonth: " + numberMonth);
    if (day >= numberMonth - 3) {
      const days = numberMonth - day;
      setDaysUntilEndOfMonth(days);
      if (days === 1) {
        setDaysLabel("Tag");
      }
      setShow(true);
      createNotification("Stundenfreigabe", "Nur noch " + days + " " + daysLabel + " bis zum neuen Monat!")
    } else {
      const week = getWeek(date);
      if (day >= week[4].getDate()) {
        setShowBeforeWeekend(true);
        createNotification("Stundenfreigabe", "Nicht vergessen die Stunden freizugeben!")
      }
    }
  };

  useEffect(() => {
    notify();
  }, []);

  return (
    <MenuItem sx={{ margin: 0, padding: 0 }} onClick={openAdTime}>
      {show ? (
        <Alert severity="warning">
          {"Nur noch"} {daysUntilEndOfMonth} {daysLabel}{" "}
          {"bis zum neuen Monat!"}
        </Alert>
      ) : null}
      {showBeforeWeekend ? (
        <Alert severity="warning">{"Stunden freigeben!"}</Alert>
      ) : null}
    </MenuItem>
  );
}

export default Warning;
