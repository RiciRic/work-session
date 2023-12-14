import React from "react";
import { SpeedDialAction, SpeedDial, SpeedDialIcon } from "@mui/material";

import { styled } from "@mui/material/styles";

import Settings from "./Settings";

import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import Link from "@mui/icons-material/Link";
import CloseIcon from "@mui/icons-material/Close";

import Project from "./Project";

import openAdTime from "../files/openAdTime";
import { ProjectArrayType } from "../types/ProjectType";

import { exit } from "@tauri-apps/api/process";

const StyledSpeedDial = styled(SpeedDial)(() => ({
  position: "absolute",
  "& .MuiFab-primary": { width: 36, height: 36 },
  "& .MuiFab-root": { margin: "4px" },
  "& #Menu-actions": { paddingTop: "32px" },
}));

interface Props {
  projects: ProjectArrayType;
  setProjects: (projects: ProjectArrayType) => void;
  setAddProject: (addProjects: boolean) => void;
}

function Menu(props: Props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openSettings, setOpenSettings] = React.useState(false);
  const [openProject, setOpenProject] = React.useState(false);

  const toggleDrawerSettings = (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    if (openSettings) {
      setOpenSettings(false);
    } else {
      setOpenSettings(true);
    }
  };

  const toggleDrawerProject = (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    if (openProject) {
      setOpenProject(false);
    } else {
      setOpenProject(true);
    }
  };
  return (
    <div style={{ width: "70px" }}>
      <StyledSpeedDial
        ariaLabel="Menu"
        icon={<SpeedDialIcon />}
        direction={"down"}
        onMouseLeave={handleClose}
        onMouseEnter={handleOpen}
        open={open}
      >
        <SpeedDialAction
          icon={<Link />}
          tooltipTitle={"adTime öffnen"}
          onClick={openAdTime}
        />

        <SpeedDialAction
          icon={<SettingsIcon />}
          tooltipTitle={"Einstellungen"}
          onClick={toggleDrawerSettings}
        />
        <SpeedDialAction
          icon={<EditIcon />}
          tooltipTitle={"Projekte bearbeiten"}
          onClick={toggleDrawerProject}
        />
        <SpeedDialAction
          //sx={{ color: theme.palette.warning.main }}
          icon={<CloseIcon />}
          tooltipTitle={"Beenden"}
          onClick={() => exit(1)}
        />
      </StyledSpeedDial>
      <Settings open={openSettings} toggleDrawer={toggleDrawerSettings} />
      <Project
        open={openProject}
        toggleDrawer={toggleDrawerProject}
        projects={props.projects}
        setProjects={props.setProjects}
        setAddProject={props.setAddProject}
      />
    </div>
  );
}

export default Menu;
