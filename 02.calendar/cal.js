#!/usr/bin/env node
import minimist from "minimist";
import { black, bgWhite } from "colorette";

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

const firstDate = new Date(year, month - 1, 1);
const lastDate = new Date(year, month, 0); // 翌月の0日は、今月末

let calendarText = "";

for (let i = 0; i < firstDate.getDay(); i++) {
  calendarText += "   ";
}

for (
  let currentDate = new Date(firstDate);
  currentDate <= lastDate;
  currentDate.setDate(currentDate.getDate() + 1)
) {
  const isToday =
    currentDate.getFullYear() === today.getFullYear() &&
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getDate() === today.getDate();

  const currentDateText = currentDate.getDate().toString().padStart(2);

  if (isToday) {
    calendarText += bgWhite(black(currentDateText));
  } else {
    calendarText += currentDateText;
  }

  const isSaturday = currentDate.getDay() === 6;
  const isLastDate = currentDate.getDate() === lastDate.getDate();

  if (isSaturday || isLastDate) {
    calendarText += "\n";
  } else {
    calendarText += " ";
  }
}

console.log(calendarText);
