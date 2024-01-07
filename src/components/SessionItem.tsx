import React, { useEffect } from "react";
import { SessionType } from "../types/SessionType";
import { CircularProgress, MenuItem, useTheme } from "@mui/material";

interface Props {
  index: number;
  setOpenSessionItem: (setOpenSessionItem: boolean, data: SessionType) => void;
  height: string;
  difference: number;
  data: SessionType;
  currentSessionId: string;
}

function SessionItem(props: Props) {
  const theme = useTheme();
  const [notCurrentSession, setNotCurrentSession] = React.useState(true);

  useEffect(() => {
    if (props.currentSessionId == props.data.id) {
      setNotCurrentSession(false);
    } else {
      setNotCurrentSession(true);
    }
  }, [props.currentSessionId]);

  return (
    <div
      key={props.index}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: props.height,
        width: "90%",
        margin: "2px",
        backgroundColor: props.data.color,
        borderRadius: "6px",
        color: theme.palette.primary.contrastText,
      }}
    >
      <MenuItem
        onClick={() => {
          if (notCurrentSession) {
            props.setOpenSessionItem(true, props.data);
          }
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0px",
          padding: "0px",
          width: "100%",
          height: "100%",
          borderRadius: "6px",
          minHeight: 0,
        }}
        
      >
        {notCurrentSession ? (
          props.difference + " Std."
        ) : (
          <CircularProgress sx={{ color: "white" }} size={15} />
        )}
      </MenuItem>
    </div>
  );
}

export default SessionItem;
