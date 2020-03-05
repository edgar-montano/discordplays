const inputs = require("../data/inputs");
const processMultiKeys = require("./processMultiKeys");

/**
 * Processes a user message, determines what command the user
 * has inputted, and how many times this command should be repeated.
 * Return null if the message is not a valid input.
 *
 * @param {String} message - User message to process
 * @return {Object} An object containing command and repeated count.
 *
 * TODO: Add functionality to slice a sentence.
 * TODO: Add
 * TODO: Restrict repeat functionality.
 */
const processMessage = message => {
  // key is the initial value we will return
  let key = null;
  let msg = message;
  let repeated = 0;
  let multiKey = false;
  //query different set of keys
  let priorityKeys = inputs["priorityKeys"];
  let functionalKeys = inputs["functionalKeys"];
  let remainingKeys = { ...inputs["actionKeys"], ...inputs["directionalKeys"] };

  for (input in priorityKeys) {
    if (msg === input) {
      key = priorityKeys[input];
    }
  }
  // functional keys should not be repeated
  for (input in functionalKeys) {
    if (msg === input) {
      key = functionalKeys[input];
      multiKey = true;
      repeated = 0;
      return { key, repeated, multiKey };
    }
  }
  //iterate valid input and set key,
  //valid keys are not case sensitive and must be set to lowercase.
  msg = msg.toLowerCase();
  for (input in remainingKeys) {
    if (msg === input) {
      key = remainingKeys[input];
    }
  }

  if (key) {
    // repeat command if user input has a numeric attached
    // e.g. 'up9' should repeat 'up' 9 times.
    repeated = parseInt(msg.slice(-1)) ? parseInt(msg.slice(-1)) : 0;
    // remove numeric value from msg
    if (repeated !== 0) msg = msg.slice(0, -1);
    //iterate through alternative keys first since they are case
    //sensitive.
    return { key, repeated, multiKey };
  } else return null; //return null if not found, otherwise return obj with key and repeat value
};

module.exports = processMessage;
