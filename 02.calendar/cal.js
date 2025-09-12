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

const firstDay = new Date(year, month - 1, 1);
const lastDay = new Date(year, month, 0); // 翌月の0日は、今月末

const yearAndMonth = `${month}月 ${year}`;
console.log(yearAndMonth.padStart(14));
console.log("日 月 火 水 木 金 土");

let calendar_format = "";

for (let day_count = 0; day_count < firstDay.getDay(); day_count++) {
  calendar_format += "   ";
}

for (let date = 1; date <= lastDay.getDate(); date++) {
  if (
    date === today.getDate() &&
    year === today.getFullYear() &&
    month === today.getMonth() + 1
  ) {
    // 今日の日付の色を反転
    calendar_format +=
      "\x1b[30;47m" + date.toString().padStart(2) + "\x1b[0m" + " ";
  } else {
    calendar_format += date.toString().padStart(2) + " ";
  }

  const current_day = new Date(year, month - 1, date);
  if (current_day.getDay() === 6) {
    calendar_format += "\n";
  }
}

console.log(calendar_format);
