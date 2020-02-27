const validInput = require("../data/validInput.json");
const alternativeInput = require("../data/alternativeInput.json");

/**
 * Processes a user message, determines what command the user
 * has inputted, and how many times this command should be repeated.
 * Return null if the message is not a valid input.
 *
 * @param {String} message - User message to process
 * @return {Object} An object containing command and repeated count.
 *
 * TODO: Add functionality to slice a sentence.
 * TODO: Restrict repeat functionality.
 */
const processMessage = message => {
  // key is the initial value we will return
  let key = null;
  let msg = message.content;
  // repeat command if user input has a numeric attached
  // e.g. 'up9' should repeat 'up' 9 times.
  let repeated = parseInt(msg.slice(-1)) ? parseInt(msg.slice(-1)) : 0;
  // remove numeric value from msg
  if (repeated !== 0) msg = msg.slice(0, -1);
  //iterate through alternative keys first since they are case
  //sensitive.
  for (input in alternativeInput) {
    if (msg === input) {
      key = alternativeInput[input];
      return { key, repeated };
    }
  }
  //iterate valid input and set key,
  //valid keys are not case sensitive and must be set to lowercase.
  msg = msg.toLowerCase();
  for (input in validInput) {
    if (msg === input) {
      key = validInput[input];
      return { key, repeated };
    }
  }
  //return null if not found, otherwise return obj with key and repeat value
  return null;
};

module.exports = processMessage;
