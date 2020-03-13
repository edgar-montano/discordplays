const inputs = require("../data/inputs.json"); // TODO: Add hotswapping later.
/**
 * Processes the user message for any valid input.
 * @param {String} msg - The original user message within message.content.
 * @return {Object} keys - The key value pair that should be executed, null if the key does not exist in lookup table.
 */
module.exports = message = msg => {
  let key = null;
  for (input in inputs) {
    if (msg.toLowerCase() === input) {
      key = inputs[input];
    }
  }
  return key;
};
