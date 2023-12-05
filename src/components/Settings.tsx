//import React from "react";
import {
  Drawer,
  Typography,
  Box,
  Button,
  FormGroup,
  FormControlLabel,
  Switch,
  Divider,
  Tooltip,
} from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";

import { exit } from "@tauri-apps/api/process";

interface Props {
  open: boolean;
  toggleDrawer: (event: any) => void;
}

function Settings(props: Props) {
  const anchor = "left";

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
          width: "250px",
          height: "100%",
          padding: "6px",
          userSelect: "none",
          gap: "6px",
        }}
      >
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <SettingsIcon fontSize={"small"} />
          <Typography>Einstellungen</Typography>
        </div>
        <Divider flexItem />
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Beim Hochfahren starten"
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Fenster beim Session-Start verstecken"
          />
        </FormGroup>
      </Box>
      <Divider />
      <Tooltip title="work-session beenden" placement="top">
        <Button
          variant="text"
          color={"error"}
          onClick={() => {
            console.log("close");
            exit(1);
          }}
        >
          Beenden
        </Button>
      </Tooltip>
    </Drawer>
  );
}

export default Settings;
