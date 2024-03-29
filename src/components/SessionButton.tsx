import React from "react";

import { Button } from "@mui/material";
import { SessionArrayType, SessionType } from "../types/SessionType";

import { SettingsType } from "../types/SettingsType";

import { appWindow } from "@tauri-apps/api/window";
import createUniqueId from "../files/createUniqueId";
import Timer from "./Timer";
import ProjectType from "../types/ProjectType";
import { saveData } from "../files/store";

interface Props {
  data: SessionArrayType;
  setData: (data: SessionArrayType) => void;
  project: ProjectType;
  settings: SettingsType;
  currentSessionId: string;
  setCurrentSessionId: (currentSessionId: string) => void;
}

function SessionButton(props: Props) {
  const [variant, setVariant] = React.useState<
    "contained" | "outlined" | "text"
  >("contained");

  const [startTimer, setStartTimer] = React.useState(false);

  const [hover, setHover] = React.useState(false);

  const startStopSession = async () => {
    if (startTimer) {
      setStartTimer(false);
      setVariant("contained");
      props.setCurrentSessionId("");
    } else {
      setStartTimer(true);
      setVariant("outlined");
      handleAddSessionItem();
      setHover(false);
      if (props.settings.sessionStartHideToTray) {
        await appWindow.hide();
      }
    }
  };

  const handleAddSessionItem = () => {
    const sessionDate = new Date();
    const sessionId = createUniqueId();
    const newSession: SessionType = {
      id: sessionId,
      date: sessionDate.toISOString(),
      project: props.project.name,
      description: "",
      start: sessionDate.getTime(),
      end: sessionDate.getTime(),
      color: props.project.color,
    };
    const newData: SessionArrayType = [...props.data, newSession];
    props.setCurrentSessionId(sessionId);
    props.setData(newData);
    saveData(newData);
  };

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          size="large"
          variant={variant}
          onClick={() => {
            startStopSession();
          }}
          sx={{ borderRadius: "30px", width: "190px", height: "50px" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Timer
            start={startTimer}
            currentSessionId={props.currentSessionId}
            data={props.data}
            setData={props.setData}
            hover={hover}
          />
        </Button>
      </div>
    </>
  );
}

export default SessionButton;
