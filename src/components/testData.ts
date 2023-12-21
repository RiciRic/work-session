const testDate = new Date();
const testDate2 = new Date();

const data = [
  {
    id: "1",
    date: testDate.toISOString(),
    project: "CC",
    description: "halloseee",
    start: testDate.getTime(),
    end: new Date(
      testDate2.setTime(new Date().getTime() + 7 * 60 * 60 * 1000)
    ).getTime(),
    color: "#1976d2",
  },
  {
    id: "1",
    date: testDate.toISOString(),
    project: "projekt2",
    description: "",
    start: testDate.getTime(),
    end: new Date(
      testDate2.setTime(new Date().getTime() + 3 * 60 * 60 * 1000)
    ).getTime(),
    color: "#f9b32b",
  },
  {
    id: "1",
    date: testDate.toISOString(),
    project: "projekt1",
    description: "",
    start: testDate.getTime(),
    end: new Date(
      testDate2.setTime(new Date().getTime() + 1 * 60 * 60 * 1000)
    ).getTime(),
    color: "#1976d2",
  },

  {
    id: "1",
    date: testDate.toISOString(),
    project: "projekt3",
    description: "hallo",
    start: testDate.getTime(),
    end: new Date(
      testDate2.setTime(new Date().getTime() + 1 * 60 * 60 * 1000)
    ).getTime(),
    color: "#8119d2",
  },

  {
    id: "1",
    date: testDate.toISOString(),
    project: "projekt1",
    description: "hallo",
    start: testDate.getTime(),
    end: new Date(
      testDate2.setTime(new Date().getTime() + 5 * 60 * 60 * 1000)
    ).getTime(),
    color: "#1976d2",
  },
];

export default data;
