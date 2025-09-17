#!/usr/bin/env node

export default function fizzbuzz(number) {
  if (number % 3 === 0 && number % 5 === 0) {
    return "FizzBuzz";
  } else if (number % 3 === 0) {
    return "Fizz";
  } else if (number % 5 === 0) {
    return "Buzz";
  } else {
    return number.toString();
  }
}

function main() {
  for (let number = 1; number <= 20; number++) {
    console.log(fizzbuzz(number));
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
