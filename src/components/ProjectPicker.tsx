import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";
import ProjectType from "../types/ProjectType";

interface Props {
  projects: ProjectType[];
}

function ProjectPicker(props: Props) {
  const [project, setProject] = React.useState(0);

  const handleChange = (event: any) => {
    setProject(event.target.value);
  };

  return (
    <FormControl size="small">
      <Select placeholder="Projekt" value={project} onChange={handleChange}>
        {props.projects.map((project: any, index: number) => {
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
