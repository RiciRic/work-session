import { useEffect, useState } from "react";
import { Box, Paper, Divider } from "@mui/material";

import getWeek from "../files/getWeek";

import Day from "./Day";
import ProjectPicker from "./ProjectPicker";
import DatePicker from "./DatePicker";
import { ProjectArrayType } from "../types/ProjectType";
import { SessionArrayType, SessionType } from "../types/SessionType";

import testData from "./testData";

//import { loadData } from "../files/store";
import SessionItem from "./SessionItem";

interface Props {
  projects: ProjectArrayType;
  date: Date;
  setDate: (date: Date) => void;
  setWorkedHours: (hours: number) => void;
}

function Calendar(props: Props) {
  const [week, setWeek] = useState(getWeek(props.date));

  const [data, setData] = useState<SessionArrayType>([]);

  const [monday, setMonday] = useState<SessionArrayType>([]);
  const [workedMonday, setWorkedMonday] = useState(0);

  const [tuesday, setTuesday] = useState<SessionArrayType>([]);
  const [workedTuesday, setWorkedTuesday] = useState(0);

  const [wednesday, setWednesday] = useState<SessionArrayType>([]);
  const [workedWednesday, setWorkedWednesday] = useState(0);

  const [thursday, setThursday] = useState<SessionArrayType>([]);
  const [workedThursday, setWorkedThursday] = useState(0);

  const [friday, setFriday] = useState<SessionArrayType>([]);
  const [workedFriday, setWorkedFriday] = useState(0);

  const [saturday, setSaturday] = useState<SessionArrayType>([]);
  const [workedSaturday, setWorkedSaturday] = useState(0);

  const [sunday, setSunday] = useState<SessionArrayType>([]);
  const [workedSunday, setWorkedSunday] = useState(0);

  const [openSessionItem, setOpenSessionItem] = useState(false);
  const [sessionItemData, setSessionItemData] = useState<SessionType>({
    id: "0",
    date: "",
    description: "",
    project: "",
    color: "#1e1e1e",
    start: 0,
    end: 0,
  });

  useEffect(() => {
    const sum =
      workedMonday +
      workedTuesday +
      workedWednesday +
      workedThursday +
      workedFriday +
      workedSaturday +
      workedSunday;

    props.setWorkedHours(sum);
  }, [
    workedMonday,
    workedTuesday,
    workedWednesday,
    workedThursday,
    workedFriday,
    workedSaturday,
    workedSunday,
  ]);

  useEffect(() => {
    console.log("LADE DATA");
    /*loadData().then((data: SessionArrayType) => {
      setData(data);
    });*/
    setData(testData);
  }, []);

  const setWeekData = (week: Date[]) => {
    setMonday(filterByDate(week[0]));
    setTuesday(filterByDate(week[1]));
    setWednesday(filterByDate(week[2]));
    setThursday(filterByDate(week[3]));
    setFriday(filterByDate(week[4]));
    setSaturday(filterByDate(week[5]));
    setSunday(filterByDate(week[6]));
  };

  const filterByDate = (date: Date) => {
    const filteredData = data.filter((sessionType) => {
      const sessionTypeDate = new Date(sessionType.date);
      if (sessionTypeDate.getFullYear() == date.getFullYear()) {
        if (sessionTypeDate.getMonth() == date.getMonth()) {
          if (sessionTypeDate.getDate() == date.getDate()) {
            return true;
          }
        }
      }
      return false;
    });
    return filteredData;
  };

  useEffect(() => {
    const newWeek = getWeek(props.date);
    setWeek(getWeek(props.date));
    setWeekData(newWeek);
  }, [props.date, data]);

  const handleSetOpenSessionItem = (open: boolean, data: SessionType) => {
    setOpenSessionItem(open);
    setSessionItemData(data);
  };

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
        <SessionItem
          open={openSessionItem}
          setOpen={setOpenSessionItem}
          data={sessionItemData}
        />
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
            borderColor: "gray",
            height: "100%",
          }}
        >
          <Day
            date={week[0]}
            data={monday}
            setOpenSessionItem={handleSetOpenSessionItem}
            worked={workedMonday}
            setWorked={setWorkedMonday}
          />
          <Divider orientation="vertical" />
          <Day
            date={week[1]}
            data={tuesday}
            setOpenSessionItem={handleSetOpenSessionItem}
            worked={workedTuesday}
            setWorked={setWorkedTuesday}
          />
          <Divider orientation="vertical" />
          <Day
            date={week[2]}
            data={wednesday}
            setOpenSessionItem={handleSetOpenSessionItem}
            worked={workedWednesday}
            setWorked={setWorkedWednesday}
          />
          <Divider orientation="vertical" />
          <Day
            date={week[3]}
            data={thursday}
            setOpenSessionItem={handleSetOpenSessionItem}
            worked={workedThursday}
            setWorked={setWorkedThursday}
          />
          <Divider orientation="vertical" />
          <Day
            date={week[4]}
            data={friday}
            setOpenSessionItem={handleSetOpenSessionItem}
            worked={workedFriday}
            setWorked={setWorkedFriday}
          />
          <Divider orientation="vertical" />
          <Day
            date={week[5]}
            data={saturday}
            setOpenSessionItem={handleSetOpenSessionItem}
            worked={workedSaturday}
            setWorked={setWorkedSaturday}
          />
          <Divider orientation="vertical" />
          <Day
            date={week[6]}
            data={sunday}
            setOpenSessionItem={handleSetOpenSessionItem}
            worked={workedSunday}
            setWorked={setWorkedSunday}
          />
        </div>
      </Paper>
    </Box>
  );
}

export default Calendar;
