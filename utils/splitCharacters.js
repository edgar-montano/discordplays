/**
 * Split a message string by a specific number of characters
 * @param {String} msg - Message to split to characters.
 * @return {Array} - A string array of all split character combinations.
 */
module.exports = splitCharacters = msg => {
  let splits = [];
  let nextCharIndex = 0;
  msg = msg.split("");

  for (let i = 0; i < msg.length; i++) {
    nextCharIndex = i + 1;
    if (nextCharIndex < msg.length) {
      splits.push(msg[i] + msg[nextCharIndex]);
    }
  }
  return splits;
};
