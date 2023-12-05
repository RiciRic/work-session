import React from "react";
import { SpeedDialAction, SpeedDial, SpeedDialIcon } from "@mui/material";

import { styled } from "@mui/material/styles";

import Settings from "./Settings";

import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import Link from "@mui/icons-material/Link";

import Project from "./Project";

import openAdTime from "../files/openAdTime";

const StyledSpeedDial = styled(SpeedDial)(() => ({
  position: "absolute",
  "& .MuiFab-primary": { width: 36, height: 36 },
  "& .MuiFab-root": { margin: "4px" },
  "& #Menu-actions": { paddingTop: "32px" },
}));

interface Props {
  projects: any;
  setProjects: (projects: any) => void;
}

function Menu(props: Props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openSettings, setOpenSettings] = React.useState(false);
  const [openProject, setOpenProject] = React.useState(false);

  const toggleDrawerSettings = (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (openSettings) {
      setOpenSettings(false);
    } else {
      setOpenSettings(true);
    }
  };

  const toggleDrawerProject = (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
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
      </StyledSpeedDial>
      <Settings open={openSettings} toggleDrawer={toggleDrawerSettings} />
      <Project
        open={openProject}
        toggleDrawer={toggleDrawerProject}
        projects={props.projects}
        setProjects={props.setProjects}
      />
    </div>
  );
}

export default Menu;
