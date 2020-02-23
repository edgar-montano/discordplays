var robot = require("robotjs");

const testWalk = (key, delay, repeat) => {
  robot.setKeyboardDelay(delay);
  for (let i = 0; i < repeat; i++) {
    console.log(`Sending ${key}`);
    robot.keyTap(key);
  }
};

module.exports = testWalk;
