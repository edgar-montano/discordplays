const processSingleKey = require("./processSingleKey");
const processMuliKey = require("./processMultiKeys");
/**
 *
 * @param {String|Array} keys - Either single key tap or an array of key taps
 * @param {Number} repeated - Whether or not to repeat the key.
 * @param {Boolean} multiKey - Flag used to determine if multiple keys or not.
 *
 */
const processKeys = (keys, repeated, multiKey) => {
  if (multiKey) {
    processMuliKey(keys);
  } else {
    processSingleKey(keys, repeated);
  }
};
module.exports = processKeys;
