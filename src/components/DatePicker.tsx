import React, { useEffect } from "react";

import "dayjs/locale/de";
import dayjs from "dayjs";

import {
  Modal,
  ListItem,
  ListItemText,
  ListItemButton,
  List,
  Tooltip,
  Box,
  IconButton,
  Collapse,
  Button,
  Typography,
  Divider,
} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersActionBarProps, StaticDatePicker } from "@mui/x-date-pickers";
import { pickersLayoutClasses } from "@mui/x-date-pickers/PickersLayout";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import getWeek from "../files/getWeek";

function ActionList(props: PickersActionBarProps) {
  const { onSetToday, className } = props;
  const actions = [{ text: "heute", method: onSetToday }];
  return (
    <List className={className}>
      {actions.map(({ text, method }) => (
        <ListItem key={text} disablePadding>
          <ListItemButton onClick={method}>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

function CustomToolbar() {
  return <></>;
}

interface Props {
  date: Date;
  setDate: (date: Date) => void;
}

function DatePicker(props: Props) {
  const [value, setValue] = React.useState(dayjs());

  const [startWeek, setStartWeek] = React.useState("");
  const [endWeek, setEndWeek] = React.useState("");
  /*const [valueWeek, setValueWeek] = React.useState(
    getWeek(new Date(props.date.toISOString()))
  );*/

  useEffect(() => {
    const week = getWeek(new Date(value.toISOString()));
    setStartWeek(dateToString(week[0]));
    setEndWeek(dateToString(week[6]));
  }, [value]);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const dateToString = (date: Date) => {
    const day = date.toLocaleDateString("de-DE", { day: "numeric" }) + ".";
    const month = date.toLocaleDateString("de-DE", { month: "long" });
    return day + " " + month;
  };

  const dateOneWeekBackward = () => {
    let newDate = new Date(props.date.toISOString());
    newDate.setDate(newDate.getDate() - 7);
    props.setDate(newDate);
  };

  const dateOneWeekForward = () => {
    let newDate = new Date(props.date.toISOString());
    newDate.setDate(newDate.getDate() + 7);
    props.setDate(newDate);
  };

  const setNewDate = () => {
    let newDate = new Date(value.toISOString());
    props.setDate(newDate);
    handleClose();
  };

  return (
    <div>
      <div>
        <Tooltip title="eine Woche weiter" placement="bottom-start">
          <IconButton sx={{ float: "right" }} onClick={dateOneWeekForward}>
            <KeyboardArrowRightIcon fontSize={"small"} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Woche einstellen">
          <IconButton sx={{ float: "right" }} onClick={handleOpen}>
            <CalendarTodayIcon fontSize={"small"} />
          </IconButton>
        </Tooltip>
        <Tooltip title="eine Woche zurück">
          <IconButton sx={{ float: "right" }} onClick={dateOneWeekBackward}>
            <KeyboardArrowLeftIcon fontSize={"small"} />
          </IconButton>
        </Tooltip>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Collapse in={open}>
          <Box sx={{ borderRadius: "50px" }}>
            <div
              style={{
                backgroundColor: "white",
                paddingTop: "12px",
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="subtitle1">{"Woche"}</Typography>
                <Typography variant="h6">
                  {startWeek + " - " + endWeek}
                </Typography>
                <Divider />
              </div>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
              <StaticDatePicker
                value={value}
                onChange={(value: any) => {
                  setValue(value);
                }}
                slotProps={{
                  layout: {
                    sx: {
                      [`.${pickersLayoutClasses.actionBar}`]: {
                        gridColumn: 1,
                        gridRow: 2,
                      },
                    },
                  },
                }}
                slots={{
                  actionBar: ActionList,
                  toolbar: CustomToolbar,
                }}
              />
            </LocalizationProvider>
            <div
              style={{
                backgroundColor: "white",
                paddingBottom: "6px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  setNewDate();
                }}
              >
                auswählen
              </Button>
              <Button
                variant="text"
                onClick={() => {
                  handleClose();
                }}
              >
                abbrechen
              </Button>
            </div>
          </Box>
        </Collapse>
      </Modal>
    </div>
  );
}

export default DatePicker;
