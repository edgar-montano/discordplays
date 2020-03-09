const robot = require("robotjs");

const proceessSingleKey = (key, repeated) => {
  robot.setKeyboardDelay(1);
  do {
    robot.keyTap(key);
    repeated--;
  } while (repeated > 0);
};

module.exports = proceessSingleKey;
