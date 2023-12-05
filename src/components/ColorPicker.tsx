//import React from "react";

import { MuiColorInput } from "mui-color-input";

import { useTheme } from "@mui/material/styles";

interface Props {
  color: string;
  setColor: (color: string) => void;
}

function ColorContainer(props: Props) {
  return (
    <div
      style={{
        backgroundColor: props.color,
        width: "30px",
        height: "30px",
        borderRadius: "5px",
        cursor: "pointer",
      }}
      onClick={() => props.setColor(props.color)}
    ></div>
  );
}

function ColorPicker(props: Props) {
  const theme = useTheme();

  return (
    <div>
      <MuiColorInput
        fallbackValue={theme.palette.primary.main}
        format="hex"
        size="small"
        value={props.color}
        isAlphaHidden
        sx={{ width: "130px" }}
        onChange={props.setColor}
      />
      <div style={{ display: "flex", margin: "6px", gap: "6px" }}>
        <ColorContainer color={"#1976d2"} setColor={props.setColor} />
        <ColorContainer color={"#7619d2"} setColor={props.setColor} />
        <ColorContainer color={"#d21976"} setColor={props.setColor} />
        <ColorContainer color={"#d21919"} setColor={props.setColor} />
        <ColorContainer color={"#d27619"} setColor={props.setColor} />
        <ColorContainer color={"#76d219"} setColor={props.setColor} />
        <ColorContainer color={"#d2d219"} setColor={props.setColor} />
      </div>
    </div>
  );
}

export default ColorPicker;
