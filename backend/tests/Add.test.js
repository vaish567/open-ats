"use strict";
const sum = require("../Add.js");
test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("Does not add NaN inputs", () => {
  expect(sum({ name: "james" }, [1, 4, "3q"])).toBe("a & b must be numbers");
});
