const inputs = require("../data/inputs.json");
const splitCharacters = require("../utils/splitCharacters");
/**
 * Processes a sentence and tries to detect a possible mis-spelling of a character,
 * the bot should then relay the recommended word.
 * @param {String} msg - The message with possible input
 * @return {String} - The proper input string if detected, return empty string if not found.
 */

module.exports = processSentence = msg => {
  let input = "";
  let inputStr = Object.keys(inputs).map(value => value);
  let msgSplit = splitCharacters(msg);

  for (let k = 0; k < msgSplit.length; k++) {
    for (let l = 0; l < inputStr.length; l++) {
      if (inputStr[l].includes(msgSplit[k])) {
        input = inputStr[l];
        return input;
      }
    }
  }
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
