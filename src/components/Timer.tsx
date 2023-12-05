import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
let interval: any = null;
let seconds = 0;

interface Props {
  start: boolean;
}

function Timer(props: Props) {
  const [time, setTime] = useState("00:00:00");

  const handleStart = () => {
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(timer, 1000);
  };

  const handleStop = () => {
    clearInterval(interval);
    if (time !== "00:00:00") {
      console.log("Timer Stop: " + time);
    }
  };

  useEffect(() => {
    if (props.start) {
      seconds = 0;
      handleStart();
    } else {
      handleStop();
    }
  }, [props.start]);

  const timer = () => {
    seconds++;
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds - hrs * 3600) / 60);
    const secs = seconds % 60;

    let secsString = secs.toString();
    let minsString = mins.toString();
    let hrsString = hrs.toString();

    if (secs < 10) secsString = "0" + secs;
    if (mins < 10) minsString = "0" + mins;
    if (hrs < 10) hrsString = "0" + hrs;

    setTime(hrsString + ":" + minsString + ":" + secsString);
  };
  return <Typography>{time}</Typography>;
}

export default Timer;
