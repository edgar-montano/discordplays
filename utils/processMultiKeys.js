const robot = require("robotjs");
/**
 * Functional keys require special key toggle upon action.
 */
const processMultiKeys = inputArray => {
  //first key in input array should be teh key we are holding
  robot.setKeyboardDelay(100); // needs to avoid frame lag where we cannot input any data
  for (let i = 0; i < inputArray.length; i++) robot.keyTap(inputArray[i]);
};
module.exports = processMultiKeys;
