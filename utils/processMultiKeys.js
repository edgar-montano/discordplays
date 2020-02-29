const robot = require("robotjs");
/**
 * Functional keys require special key toggle upon action.
 */
const processMultiKeys = inputArray => {
  //first key in input array should be teh key we are holding
  robot.keyToggle(inputArray[0], "down");
  for (let i = 1; i < inputArray.length; i++) robot.keyTap(inputArray[i]);
  robot.keyToggle(inputArray[0], "up");
};
module.exports = processMultiKeys;
