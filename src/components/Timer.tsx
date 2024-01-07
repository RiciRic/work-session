import { useEffect, useState } from "react";
import StopIcon from "@mui/icons-material/Stop";
import { invoke } from "@tauri-apps/api/tauri";
import { SessionArrayType, SessionType } from "../types/SessionType";
import { saveData } from "../files/store";
let interval: any = null;
let seconds = 0;

interface Props {
  start: boolean;
  currentSessionId: string;
  data: SessionArrayType;
  setData: (data: SessionArrayType) => void;
  hover: boolean;
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

  useEffect(() => {}, [props.currentSessionId]);

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

    if (seconds % 60 == 0) {
      invoke("get_path_to_exe").then((path) => console.log(path));
    }

    if (seconds % 120 == 0) {
      let arrayToChange: SessionArrayType = [...props.data];
      let elementToChange: any = arrayToChange.find(
        (x: SessionType) => x.id === props.currentSessionId
      );
      elementToChange.end = new Date().getTime();
      props.setData(arrayToChange);
      saveData(arrayToChange);
    }
  };
  return <>{props.hover ? <StopIcon /> : time}</>;
}

export default Timer;
