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

import { enable, isEnabled, disable } from "tauri-plugin-autostart-api";
import { SettingsType } from "../types/SettingsType";
import { saveSettings } from "../files/store";

interface Props {
  open: boolean;
  toggleDrawer: (event: React.KeyboardEvent | React.MouseEvent) => void;
  settings: SettingsType;
  setSettings: (settings: SettingsType) => void;
}

function Settings(props: Props) {
  const anchor = "left";

  const [startup, setStartup] = React.useState(false);
  const [sessionStartHideToTray, setSessionStartHideToTray] =
    React.useState<boolean>(props.settings.sessionStartHideToTray);
  const [forceUnlock, setForceUnlock] = React.useState<boolean>(
    props.settings.forceUnlock
  );

  const changeAutoStart = async (startup: boolean) => {
    if (startup) {
      await enable();
      setStartup(true);
    } else {
      disable();
      setStartup(false);
    }
  };

  const getAutoStart = async () => {
    const value = await isEnabled();
    setStartup(value);
  };

  useEffect(() => {
    getAutoStart();
    console.log("junge " + props.settings.sessionStartHideToTray);
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
          marginLeft: "10px",
          width: "300px",
          height: "100%",
          padding: "6px",
          userSelect: "none",
          gap: "6px",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            gap: "6px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SettingsIcon fontSize={"small"} />
          <Typography>Einstellungen</Typography>
        </div>
        <Divider flexItem />
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={startup}
                onChange={(event) => changeAutoStart(event.target.checked)}
              />
            }
            label="Beim Hochfahren starten"
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={sessionStartHideToTray}
                onChange={(event) => {
                  let newSettings: SettingsType = { ...props.settings };
                  newSettings.sessionStartHideToTray = event.target.checked;
                  setSessionStartHideToTray(event.target.checked);
                  props.setSettings(newSettings);
                  saveSettings(newSettings);
                }}
              />
            }
            label="Fenster beim Session-Start verstecken"
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={forceUnlock}
                onChange={(event) => {
                  let newSettings: SettingsType = { ...props.settings };
                  newSettings.forceUnlock = event.target.checked;
                  setForceUnlock(event.target.checked);
                  props.setSettings(newSettings);
                  saveSettings(newSettings);
                }}
              />
            }
            label="Entsperren erzwingen"
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
