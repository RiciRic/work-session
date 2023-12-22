import React, { useEffect } from "react";
import { FormControl, Select, MenuItem } from "@mui/material";
import ProjectType, { ProjectArrayType } from "../types/ProjectType";

interface Props {
  projects: ProjectArrayType;
  project: ProjectType;
  setProject: (project: ProjectType) => void;
}

function ProjectPicker(props: Props) {
  const handleChange = (value: ProjectType) => {
    props.setProject(value);
  };

  useEffect(() => {
    if (props.projects.length > 0) {
      handleChange(props.projects[0]);
    }
  }, [props.projects]);

  return (
    <FormControl size="small">
      <Select
        placeholder="Projekt"
        value={props.project}
        onChange={(event) => {
          const value = event.target.value as ProjectType;
          handleChange(value);
        }}
      >
        {props.projects.map((project: ProjectType, index: number) => {
          return (
            <MenuItem key={index} value={index}>
              {project.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default ProjectPicker;
