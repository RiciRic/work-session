import React from "react";
import { Modal, Box, FormControl, Button, Typography } from "@mui/material";

import OutlinedInput from "@mui/material/OutlinedInput";

import { useTheme } from "@mui/material/styles";

import createUniqueId from "../files/createUniqueId";
import ProjectType from "../types/ProjectType";

interface Props {
  projects: ProjectType[];
  setProjects: any;
  handleChange: (value: any) => void;
  handleClose: () => void;
  open: boolean;
}

function AddProject(props: Props) {
  const theme = useTheme();

  const [value, setValue] = React.useState("");

  const [disabled, setDisabled] = React.useState(true);

  const handleAddProject = () => {
    const newElement: ProjectType = {
      id: createUniqueId(),
      name: value,
      color: theme.palette.primary.main,
    };
    props.setProjects((oldArray: ProjectType[]) => [...oldArray, newElement]);

    const projectsLength = props.projects.length;
    props.handleChange(props.projects[projectsLength - 1]);
    setValue("");
    props.handleClose();
  };
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          justifyContent: "center",
          alignItems: "center",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 3,
        }}
      >
        <Typography>Projekt hinzufügen</Typography>
        <FormControl sx={{ width: "100%" }}>
          <OutlinedInput
            value={value}
            onChange={(event) => {
              if (event.target.value !== "") {
                setDisabled(false);
              } else {
                setDisabled(true);
              }
              setValue(event.target.value);
            }}
            autoFocus
            size={"small"}
            placeholder="Projektname"
          />
        </FormControl>
        <div>
          <Button
            disabled={disabled}
            variant="contained"
            onClick={handleAddProject}
          >
            hinzufügen
          </Button>
          <Button variant="text" onClick={props.handleClose}>
            abbrechen
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default AddProject;
