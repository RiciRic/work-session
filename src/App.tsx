import { useState, useEffect } from "react";

import { Button, Typography } from "@mui/material";
import CalendarWeek from "./components/CalendarWeek";
import Calendar from "./components/Calendar";

import Warning from "./components/Warning";
import Timer from "./components/Timer";
import Menu from "./components/Menu";

import { loadProjects } from "./files/store";

import "./css/transitionIn.css";
import AddProject from "./components/AddProject";
import { ProjectArrayType } from "./types/ProjectType";

/*import { cacheDir } from "@tauri-apps/api/path";
const cacheDirPath = await cacheDir();
console.log(cacheDirPath);*/

function App() {
  const [date, setDate] = useState(new Date());

  const [workedHours, setWorkedHours] = useState(0);

  const [projects, setProjects] = useState<ProjectArrayType>([]);

  const [addProject, setAddProject] = useState(false);

  /*const [projects, setProjects] = useState<ProjectType[]>([
    { id: "1", name: "adesso Staffing Advisor", color: "#1976d2" },
    { id: "2", name: "CC", color: "#8119d2" },
  ]);*/

  useEffect(() => {
    console.log("LADE INFOS");
    loadProjects().then((projects) => {
      setProjects(projects);
      if (projects.length == 0) {
        setAddProject(true);
      }
    });
  }, []);

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
        <Menu
          projects={projects}
          setProjects={setProjects}
          setAddProject={setAddProject}
        />
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
          {workedHours}
          {" Stunden gearbeitet"}
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
        <Calendar
          date={date}
          setDate={setDate}
          projects={projects}
          setWorkedHours={setWorkedHours}
        />
      </div>
      <AddProject
        open={addProject}
        handleClose={() => setAddProject(false)}
        projects={projects}
        setProjects={setProjects}
        handleChange={() => {
          console.log("hallo");
        }}
        exitable={false}
      />
    </div>
  );
}

export default App;
