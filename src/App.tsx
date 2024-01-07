import React, { useEffect } from "react";

import { Button, Typography } from "@mui/material";
import CalendarWeek from "./components/CalendarWeek";
import Calendar from "./components/Calendar";

import Warning from "./components/Warning";
import Timer from "./components/Timer";
import Menu from "./components/Menu";

import {
  defaultSettings,
  loadData,
  loadProjects,
  loadSettings,
  saveData,
} from "./files/store";

import "./css/transitionIn.css";
import AddProject from "./components/AddProject";
import ProjectType, { ProjectArrayType } from "./types/ProjectType";
import { SessionArrayType } from "./types/SessionType";

import { SettingsType } from "./types/SettingsType";
import SessionButton from "./components/SessionButton";

function App() {
  const [date, setDate] = React.useState(new Date());

  const [workedHours, setWorkedHours] = React.useState(0);

  const [projects, setProjects] = React.useState<ProjectArrayType>([]);
  const [project, setProject] = React.useState<ProjectType>({
    id: "",
    name: "",
    color: "",
  });

  const [data, setData] = React.useState<SessionArrayType>([]);

  const [settings, setSettings] = React.useState<SettingsType>({
    ...defaultSettings,
  });

  const [addProject, setAddProject] = React.useState(false);

  const [currentSessionId, setCurrentSessionId] = React.useState("");

  useEffect(() => {
    console.log("LADE INFOS");
    loadProjects().then((projects) => {
      setProjects(projects);
      if (projects.length == 0) {
        setAddProject(true);
      } else {
        setProject(projects[0]);
      }
    });
    console.log("LADE DATA");
    loadData().then((data: SessionArrayType) => {
      setData(data);
    });
    console.log("LADE Settings");
    loadSettings().then((settings: SettingsType) => {
      setSettings(settings);
      console.log(settings);
    });
  }, []);

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
          settings={settings}
          setSettings={setSettings}
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
        <SessionButton
          data={data}
          setData={setData}
          settings={settings}
          project={project}
          currentSessionId={currentSessionId}
          setCurrentSessionId={setCurrentSessionId}
        />
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
          currentSessionId={currentSessionId}
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
