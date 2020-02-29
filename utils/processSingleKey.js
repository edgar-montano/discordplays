const robot = require("robotjs");
const proceessSingleKey = (key, repeated) => {
  do {
    robot.keyTap(key);
    repeated--;
  } while (repeated > 0);
};

module.exports = proceessSingleKey;
