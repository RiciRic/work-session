import { useState } from "react";

import { Button, Typography } from "@mui/material";
import CalendarWeek from "./components/CalendarWeek";
import Calendar from "./components/Calendar";

import Warning from "./components/Warning";
import Timer from "./components/Timer";
import Menu from "./components/Menu";

//import { window } from "@neutralinojs/lib";

//import "./files/trayIcon";

import "./css/transitionIn.css";

function App() {
  const [date, setDate] = useState(new Date());

  const [projects, setProjects] = useState([
    { id: "1", name: "adesso Staffing Advisor", color: "#1976d2" },
    { id: "2", name: "CC", color: "#8119d2" },
  ]);

  const [startTimer, setStartTimer] = useState(false);
  const [sessionButtonLabel, setSessionButtonLabel] =
    useState("Session starten");

  const startStopSession = () => {
    if (startTimer) {
      setStartTimer(!startTimer);
      setSessionButtonLabel("Session starten");
    } else {
      setStartTimer(!startTimer);
      setSessionButtonLabel("Session beenden");
      //window.hide();
    }
  };

  return (
    <div
      className="transitionIn"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Menu projects={projects} setProjects={setProjects} />
        <Warning />
        <CalendarWeek />
      </div>
      <div
        style={{
          height: "30%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Typography variant={"h5"}>
          {"Du hast diese Woche "}
          {"17 Stunden gearbeitet"}
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              startStopSession();
            }}
          >
            {sessionButtonLabel}
          </Button>
          <Timer start={startTimer} />
        </div>
      </div>
      <div style={{ height: "70%", width: "100%" }}>
        <Calendar date={date} setDate={setDate} projects={projects} />
      </div>
    </div>
  );
}

export default App;
