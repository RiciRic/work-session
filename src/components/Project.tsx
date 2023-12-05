import React, { useEffect } from "react";
import {
  Drawer,
  Typography,
  Box,
  Button,
  Divider,
  FormControl,
  Tooltip,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";

import EditIcon from "@mui/icons-material/Edit";
import ColorPicker from "./ColorPicker";
import AddProject from "./AddProject";

import { useTheme } from "@mui/material/styles";

interface Props {
  projects: any;
  setProjects: (projects: any) => void;
  toggleDrawer: (event: any) => void;
  open: boolean;
}

function Project(props: Props) {
  const anchor = "left";
  const theme = useTheme();

  const [selectFirstElement, setsSelectFirstElement] = React.useState(true);
  const [disabled, setDisabled] = React.useState(true);

  const [project, setProject] = React.useState("");
  const [projectId, setProjectId] = React.useState("");
  const [projectName, setProjectName] = React.useState("");
  const [projectColor, setProjectColor] = React.useState(
    theme.palette.primary.main
  );
  const [addProject, setAddProject] = React.useState(false);

  const handleChange = (value: any) => {
    console.log(value);
    setProject(value);
    setProjectId(value.id);
    setProjectName(value.name);
    setProjectColor(value.color);
  };

  useEffect(() => {
    if (props.projects && props.projects.length) {
      if (selectFirstElement) {
        handleChange(props.projects[0]);
        setsSelectFirstElement(false);
      } else {
        handleChange(props.projects[props.projects.length - 1]);
      }
    }
  }, [props.projects]);

  useEffect(() => {}, [projectName]);

  useEffect(() => {
    console.log(projectColor);
  }, [projectColor, projectColor]);

  const handleSave = (event: any) => {
    let arrayToChange: any = [...props.projects];
    let elementToChange = arrayToChange.find((x: any) => x.id === projectId);
    elementToChange.name = projectName;
    elementToChange.color = projectColor;
    props.setProjects(arrayToChange);
    props.toggleDrawer(event);
    setDisabled(true);
    setsSelectFirstElement(true);
  };

  const handleCancel = (event: any) => {
    handleChange(props.projects[0]);
    props.toggleDrawer(event);
    setDisabled(true);
    setsSelectFirstElement(true);
  };

  const handleDelete = () => {
    props.setProjects([
      ...props.projects.filter((item: any) => item.id !== projectId),
    ]);
  };

  return (
    <Drawer
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
      anchor={anchor}
      open={props.open}
      onClose={props.toggleDrawer}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "280px",
          height: "100%",
          padding: "6px",
          userSelect: "none",
          gap: "6px",
        }}
      >
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <EditIcon fontSize={"small"} />
          <Typography>Projekte bearbeiten</Typography>
        </div>
        <Divider flexItem />
        <div
          style={{
            display: "flex",
            gap: "6px",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FormControl fullWidth size="small">
            <Select
              placeholder="Projekt"
              value={project}
              onChange={(event) => {
                handleChange(event.target.value);
              }}
            >
              {props.projects.map((project: any, index: number) => {
                return (
                  <MenuItem key={index} value={project}>
                    {project.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Tooltip title="Projekt hinzufügen">
            <IconButton onClick={() => setAddProject(true)}>
              <AddIcon fontSize={"small"} />
            </IconButton>
          </Tooltip>
          <AddProject
            open={addProject}
            handleClose={() => setAddProject(false)}
            projects={props.projects}
            setProjects={props.setProjects}
            handleChange={handleChange}
          />
        </div>

        <FormControl sx={{ width: "100%" }}>
          <FormHelperText>{"Projektname"}</FormHelperText>
          <OutlinedInput
            value={projectName}
            onChange={(event) => {
              setDisabled(false);
              setProjectName(event.target.value);
            }}
            size={"small"}
            placeholder="Projekt"
          />
        </FormControl>
        <FormControl sx={{ width: "100%" }}>
          <FormHelperText>{"Projektfarbe"}</FormHelperText>
          <ColorPicker
            color={projectColor}
            setColor={(color: string) => {
              setDisabled(false);
              setProjectColor(color);
            }}
          />
        </FormControl>
        <div style={{ width: "100%" }}>
          <Button variant="text" color={"error"} onClick={handleDelete}>
            Projekt löschen
          </Button>
        </div>
        <Divider flexItem />
        <div>
          <Button disabled={disabled} variant="contained" onClick={handleSave}>
            speichern
          </Button>
          <Button variant="text" onClick={handleCancel}>
            abbrechen
          </Button>
        </div>
      </Box>
    </Drawer>
  );
}

export default Project;
