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
import ProjectType, { ProjectArrayType } from "./types/ProjectType";
import { SessionArrayType, SessionType } from "./types/SessionType";
import createUniqueId from "./files/createUniqueId";
import testData from "./components/testData";

/*import { cacheDir } from "@tauri-apps/api/path";
const cacheDirPath = await cacheDir();
console.log(cacheDirPath);*/

function App() {
  const [date, setDate] = useState(new Date());

  const [workedHours, setWorkedHours] = useState(0);

  const [projects, setProjects] = useState<ProjectArrayType>([]);
  const [project, setProject] = useState<ProjectType>({
    id: "",
    name: "",
    color: "",
  });

  const [data, setData] = useState<SessionArrayType>([]);

  const [addProject, setAddProject] = useState(false);

  useEffect(() => {
    console.log("LADE INFOS");
    loadProjects().then((projects) => {
      setProjects(projects);
      if (projects.length == 0) {
        setAddProject(true);
      }
    });
  }, []);

  useEffect(() => {
    console.log("LADE DATA");
    /*loadData().then((data: SessionArrayType) => {
      setData(data);
    });*/
    setData(testData);
  }, []);

  const [startTimer, setStartTimer] = useState(false);
  const [sessionButtonLabel, setSessionButtonLabel] =
    useState("Session starten");

  const startStopSession = () => {
    if (startTimer) {
      setStartTimer(!startTimer);
      setSessionButtonLabel("Session starten");
      handleAddSessionItem();
    } else {
      setStartTimer(!startTimer);
      setSessionButtonLabel("Session beenden");
      //window.hide();
    }
  };

  const handleAddSessionItem = () => {
    const sessionDate = new Date();
    const newSession: SessionType = {
      id: createUniqueId(),
      date: sessionDate.toISOString(),
      project: project.name,
      description: "",
      start: sessionDate.getTime(),
      end: sessionDate.getTime(),
      color: project.color,
    };
    const newData: SessionArrayType = [...data, newSession];
    setData(newData);
    //saveProjects(newProjects);
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
          data={data}
          setData={setData}
          projects={projects}
          setWorkedHours={setWorkedHours}
          project={project}
          setProject={setProject}
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
