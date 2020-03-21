const robot = require("robotjs");
/**
 * This will determine how we should process a key press command.
 * @param {String} input - Can be a single string or array of strings of inputs.
 */
module.exports = keys = input => {
  if (Array.isArray(input)) {
    robot.setKeyboardDelay(100); // needs to avoid frame lag where we cannot input any data
    for (let i = 0; i < input.length; i++) robot.keyTap(input[i]);
  } else if (typeof input === "object") {
    robot.mouseClick(input["button"], input["double"]);
  } else {
    robot.keyTap(input);
  }
};
