const inputs = {
  attack1: ["x", "x"],
  attack2: ["x", "down", "x"],
  run: ["right", "down", "x", "x"],
  dialogue: ["x", "x"]
};
const robot = require("robotjs");
const f = () => {
  robot.setKeyboardDelay(50);
  for (item of inputs["attack2"]) robot.keyTap(item);
  setTimeout(null, 500);
  for (item of inputs["dialogue"]) robot.keyTap(item);
};

setTimeout(f, 1000);
