const robot = require("robotjs");
robot.setKeyboardDelay(1);
const proceessSingleKey = (key, repeated) => {
  do {
    robot.keyTap(key);
    repeated--;
  } while (repeated > 0);
};

module.exports = proceessSingleKey;
