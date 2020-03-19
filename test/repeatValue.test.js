const checkRepeatValue = require("../utils/checkRepeatValue");

test("Check Repeat Value for up9", () => {
  expect(checkRepeatValue("up9")).toBeTruthy();
});

test("Check Repeat Value for down", () => {
  expect(checkRepeatValue("down")).toBeFalsy();
});

test("Check Repeat Value for attack1", () => {
  expect(checkRepeatValue("attack1")).toBeTruthy();
});
