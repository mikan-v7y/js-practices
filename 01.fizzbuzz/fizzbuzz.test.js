import fizzbuzz from "./fizzbuzz-function.js";

test("3の倍数かつ5の倍数でないときは、数の代わりにFizzを返す", () => {
  expect(fizzbuzz(3)).toBe("Fizz");
});

test("5の倍数かつ3の倍数でないときは、数の代わりにBuzzを返す", () => {
  expect(fizzbuzz(5)).toBe("Buzz");
  expect(fizzbuzz(20)).toBe("Buzz");
});

test("3と5の両方の倍数のときは、数の代わりにFizzBuzzを返す", () => {
  expect(fizzbuzz(15)).toBe("FizzBuzz");
});

test("それ以外は数の文字列を返す", () => {
  expect(fizzbuzz(1)).toBe("1");
  expect(fizzbuzz(2)).toBe("2");
});
