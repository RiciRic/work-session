import React, { useEffect } from "react";
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

import { invoke } from "@tauri-apps/api/tauri";

import { enable, isEnabled, disable } from "tauri-plugin-autostart-api";

interface Props {
  open: boolean;
  toggleDrawer: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

function Settings(props: Props) {
  const anchor = "left";

  const [startup, setStartup] = React.useState(true);

  const changeAutoStart = async (startup: boolean) => {
    if (startup) {
      await enable();
    } else {
      disable();
    }
  };

  const getAutoStart = async () => {
    const value = await isEnabled();
    setStartup(value);
  };

  useEffect(() => {
    invoke("get_path_to_exe").then((path) => console.log(path));
    changeAutoStart(startup);
  }, [startup]);

  useEffect(() => {
    getAutoStart();
  }, []);

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
            control={
              <Switch
                value={startup}
                onChange={(event) => setStartup(event.target.checked)}
              />
            }
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
