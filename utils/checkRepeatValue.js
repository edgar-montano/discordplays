/**
 * Simple regex expression to check if the message has repeat value appended to the string.
 * @param{String} msg - The message to process.
 * @return{Boolean} - true if the expression has a number in it
 */

module.exports = checkRepeatValue = msg => {
  return /\d/g.test(msg);
};
