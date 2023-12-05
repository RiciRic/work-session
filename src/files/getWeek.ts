function getNextSunday(date: Date) {
  let sunday = new Date(date.toISOString());
  if (sunday.toLocaleDateString("de-DE", { weekday: "long" }) === "Sonntag") {
    return sunday;
  }
  sunday.setDate(sunday.getDate() + ((0 - 1 - sunday.getDay() + 7) % 7) + 1);
  return sunday;
}

export default function getWeek(date: Date) {
  const monday = getNextSunday(date);
  monday.setDate(monday.getDate() - 6);
  //console.log("monday " + monday.toLocaleString());

  const tuesday = getNextSunday(date);
  tuesday.setDate(tuesday.getDate() - 5);
  //console.log("tuesday " + tuesday.toLocaleString());

  const wednesday = getNextSunday(date);
  wednesday.setDate(wednesday.getDate() - 4);
  //console.log("wednesday " + wednesday.toLocaleString());

  const thursday = getNextSunday(date);
  thursday.setDate(thursday.getDate() - 3);
  //console.log("thursday " + thursday.toLocaleString());

  const friday = getNextSunday(date);
  friday.setDate(friday.getDate() - 2);
  //console.log("friday " + friday.toLocaleString());

  const saturday = getNextSunday(date);
  saturday.setDate(saturday.getDate() - 1);
  //console.log("saturday " + saturday.toLocaleString());

  const sunday = getNextSunday(date);
  //console.log("sunday " + sunday.toLocaleString());

  return [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
}
