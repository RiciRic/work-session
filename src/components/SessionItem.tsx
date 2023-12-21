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
} from "@mui/material";
import { SessionType } from "../types/SessionType";
import ColorPicker from "./ColorPicker";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: SessionType;
}

function SessionItem(props: Props) {
  const [description, setDescription] = React.useState(props.data.description);

  const [projectColor, setProjectColor] = React.useState(props.data.color);
  const handleClose = () => {
    props.setOpen(false);
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
    setProjectColor(props.data.color);
    setDescription(props.data.description);
  }, [props.data]);

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
                //value={project}
                /*onChange={(event) => {
                  handleChange(event.target.value as ProjectType);
                }}*/
              >
                {/*props.projects.map((project: any, index: number) => {
                  return (
                    <MenuItem key={index} value={project}>
                      {project.name}
                    </MenuItem>
                  );
                })*/}
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
              <Button variant="text" color={"error"}>
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
