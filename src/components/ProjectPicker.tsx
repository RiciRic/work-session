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
        {props.projects.map((project: any, index: number) => {
          return (
            <MenuItem key={index} value={project}>
              {project.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default ProjectPicker;
