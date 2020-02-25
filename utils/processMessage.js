const validInput = require("../data/validInput.json");

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
  let msg = message.content.toLowerCase();
  // repeat command if user input has a numeric attached
  // e.g. 'up9' should repeat 'up' 9 times.
  let repeated = parseInt(msg.slice(-1)) ? parseInt(msg.slice(-1)) : 0;
  // remove numeric value from msg
  if (repeated !== 0) msg = msg.slice(0, -1);
  //iterate valid input and set key
  let key = null;
  for (input in validInput) {
    if (msg === input) key = input;
  }
  //return null if not found, otherwise return obj with key and repeat value
  if (!key) return null;
  return { key, repeated };
};

module.exports = processMessage;
