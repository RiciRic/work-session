import React, { useEffect, useState } from "react";
import { Box, Paper, Divider } from "@mui/material";

import getWeek from "../files/getWeek";

import Day from "./Day";
import ProjectPicker from "./ProjectPicker";
import DatePicker from "./DatePicker";
import { ProjectArrayType } from "../types/ProjectType";
import { DataType } from "../types/SessionType";

interface Props {
  projects: ProjectArrayType;
  date: Date;
  setDate: (date: Date) => void;
}

function Calendar(props: Props) {
  const [week, setWeek] = React.useState(getWeek(props.date));

  const [data, setData] = useState<DataType>({
    monday: [
      {
        project: "projekt1",
        description: "hallo",
        start: "1",
        end: "8",
        color: "#1976d2",
      },
      {
        project: "projekt2",
        description: "",
        start: "1",
        end: "4",
        color: "#f9b32b",
      },
      {
        project: "projekt1",
        description: "",
        start: "1",
        end: "2",
        color: "#1976d2",
      },
    ],
    tuesday: [
      {
        project: "projekt3",
        description: "hallo",
        start: "12",
        end: "13",
        color: "#8119d2",
      },
    ],
    wednesday: [],
    thursday: [
      {
        project: "projekt1",
        description: "hallo",
        start: "1",
        end: "6",
        color: "#1976d2",
      },
    ],
    friday: [],
    saturday: [],
    sunday: [],
  });

  useEffect(() => {
    setWeek(getWeek(props.date));
  }, [props.date]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 1,
        height: 1,
      }}
    >
      <div
        style={{
          width: "100%",
          marginBottom: "4px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <ProjectPicker projects={props.projects} />
        <DatePicker date={props.date} setDate={props.setDate} />
      </div>
      <Paper
        sx={{
          width: 1,
          height: 1,
          borderRadius: "10px",
          overflow: "hidden",
        }}
        elevation={5}
      >
        <div
          style={{
            display: "flex",
            //flexDirection: "space-evenly",
            borderColor: "gray",
            height: "100%",
          }}
        >
          <Day date={week[0]} data={data.monday} />
          <Divider orientation="vertical" />
          <Day date={week[1]} data={data.tuesday} />
          <Divider orientation="vertical" />
          <Day date={week[2]} data={data.wednesday} />
          <Divider orientation="vertical" />
          <Day date={week[3]} data={data.thursday} />
          <Divider orientation="vertical" />
          <Day date={week[4]} data={data.friday} />
          <Divider orientation="vertical" />
          <Day date={week[5]} data={data.saturday} />
          <Divider orientation="vertical" />
          <Day date={week[6]} data={data.sunday} />
        </div>
      </Paper>
    </Box>
  );
}

export default Calendar;
