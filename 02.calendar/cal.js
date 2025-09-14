#!/usr/bin/env node
import minimist from "minimist";

const options = minimist(process.argv.slice(2), {
  alias: { y: "year", m: "month" },
});

const today = new Date();
const year = options.year ?? today.getFullYear();
const month = options.month ?? today.getMonth() + 1;

if (year < 1970 || year > 2100) {
  console.error("Year can be entered from 1970 to 2100");
  process.exit(1);
}
if (month < 1 || month > 12) {
  console.error("Month can be entered from 1 to 12");
  process.exit(1);
}

const yearAndMonth = `${month}月 ${year}`;
const calendarWidth = 20;
const padding = Math.floor((calendarWidth - yearAndMonth.length) / 2);
console.log(" ".repeat(padding) + yearAndMonth);

console.log("日 月 火 水 木 金 土");

const firstDay = new Date(year, month - 1, 1);
const lastDay = new Date(year, month, 0); // 翌月の0日は、今月末

let calendarText = "";

for (let i = 0; i < firstDay.getDay(); i++) {
  calendarText += "   ";
}

for (
  let date = new Date(firstDay);
  date <= lastDay;
  date.setDate(date.getDate() + 1)
) {
  if (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  ) {
    const blackTextAndWhiteBackground = "\x1b[30;47m";
    const reset = "\x1b[0m";

    calendarText += `${blackTextAndWhiteBackground}${date.getDate().toString().padStart(2)}${reset}`;
  } else {
    calendarText += date.getDate().toString().padStart(2);
  }

  const isSaturday = date.getDay() === 6;
  const isLastDate = date.getDate() === lastDay.getDate();

  if (!isSaturday && !isLastDate) {
    calendarText += " ";
  }
  if (isSaturday) {
    calendarText += "\n";
  }
}

console.log(calendarText);
