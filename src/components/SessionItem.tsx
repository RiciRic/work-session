import React, { useEffect } from "react";

import {
  Modal,
  Box,
  Collapse,
  FormControl,
  FormHelperText,
  Typography,
  Button,
  OutlinedInput,
  Select,
  Divider,
  MenuItem,
} from "@mui/material";
import { SessionArrayType, SessionType } from "../types/SessionType";
import ColorPicker from "./ColorPicker";
import ProjectType, { ProjectArrayType } from "../types/ProjectType";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: SessionType;
  projects: ProjectArrayType;
  sessionArray: SessionArrayType;
  setSessionArray: (sessionArray: SessionArrayType) => void;
}

function SessionItem(props: Props) {
  const [description, setDescription] = React.useState(props.data.description);
  const [projectColor, setProjectColor] = React.useState(props.data.color);

  const [projects, setProjects] = React.useState<ProjectArrayType>([]);
  const [project, setProject] = React.useState({
    id: "",
    name: "",
    color: "",
  });

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleProjects = () => {
    let i = 0;
    while (i < props.projects.length) {
      if (
        props.projects[i].name == props.data.project &&
        props.projects[i].color == props.data.color
      ) {
        setProjects([...props.projects]);
        setProject(props.projects[i]);
        console.log("es ist passiert");
        return;
      }
      i++;
    }

    const newProject: ProjectType = {
      id: "",
      name: props.data.project,
      color: props.data.color,
    };
    const projects: ProjectArrayType = [newProject, ...props.projects];
    setProjects(projects);
    if (projects.length) {
      setProject(projects[0]);
    }
  };

  const handleChange = (value: ProjectType) => {
    if (value) {
      setProject(value);
      setProjectColor(value.color);
    }
  };

  const formatDate = (dateString: number) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " • " +
      date.getHours() +
      ":" +
      date.getMinutes()
    );
  };

  useEffect(() => {
    setDescription(props.data.description);
    setProjectColor(props.data.color);
  }, [props.data]);

  useEffect(() => {
    if (props.open == true) {
      handleProjects();
    }
  }, [props.open]);

  const handleDelete = () => {
    const newSessionArray: SessionArrayType = [
      ...props.sessionArray.filter(
        (item: SessionType) => item.id !== props.data.id
      ),
    ];
    props.setSessionArray(newSessionArray);
    handleClose();
    /*saveProjects(newProjects);
    if (newProjects.length == 0) {
      props.setAddProject(true);
    }*/
  };

  return (
    <>
      <Modal open={props.open} onClose={handleClose}>
        <Collapse in={props.open}>
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              justifyContent: "center",
              alignItems: "center",
              top: "45%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 2,
              p: 3,
            }}
          >
            <FormControl fullWidth size="small">
              <Select
                placeholder="Projekt"
                value={project}
                onChange={(event) => {
                  handleChange(event.target.value as ProjectType);
                }}
              >
                {projects.map((project: any, index: number) => {
                  return (
                    <MenuItem key={index} value={project}>
                      {project.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "100%" }}>
              <FormHelperText>{"Beschreibung"}</FormHelperText>
              <OutlinedInput
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
                value={description}
                size={"small"}
              />
            </FormControl>
            <div
              style={{
                display: "flex",
                gap: "6px",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography variant="body1">{"Start:"}</Typography>
              <Typography variant="subtitle1">
                {formatDate(props.data.start)}
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                gap: "6px",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography variant="body1">{"Ende:"}</Typography>
              <Typography variant="subtitle1">
                {formatDate(props.data.end)}
              </Typography>
            </div>
            <FormControl sx={{ width: "100%" }}>
              <FormHelperText>{"Projektfarbe"}</FormHelperText>
              <ColorPicker
                color={projectColor}
                setColor={(color: string) => {
                  setProjectColor(color);
                }}
              />
            </FormControl>
            <div style={{ width: "100%" }}>
              <Button variant="text" color={"error"} onClick={handleDelete}>
                Session löschen
              </Button>
            </div>
            <Divider flexItem />
            <div>
              <Button
                disabled={true}
                variant="contained"
                //onClick={handleAddProject}
              >
                speichern
              </Button>
              <Button variant="text" onClick={handleClose}>
                abbrechen
              </Button>
            </div>
          </Box>
        </Collapse>
      </Modal>
    </>
  );
}

export default SessionItem;
