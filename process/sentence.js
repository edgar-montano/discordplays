const inputs = require("../data/inputs.json");
/**
 * Processes a sentence and tries to detect a possible mis-spelling of a character,
 * the bot should then relay the recommended word.
 * @param {String} msg - The message with possible input
 * @return {String} - The proper input string if detected, return empty string if not found.
 */

module.exports = processSentence = msg => {
  let input = "";
  let inputStr = Object.keys(inputs).map(value => value);
  //this is the case for short typos, such as as, where a shortcut character may exist.

  msg = msg.split("");
  for (let i = 0; i < msg.length; i++) {
    if (inputs[msg[i]]) {
      input = msg[i];
      return input;
    } else {
      for (let j = 0; j < inputStr.length; j++) {
        if (inputStr[j].includes(msg[i])) {
          input = inputStr[j];
          return input;
        }
      }
    }
  }

  return input;
};
