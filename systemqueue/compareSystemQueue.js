const calculateSystemQueue = require("./calculateSystemQueue");

/**
 * Compare current most popular, with the new key input,
 * if new key is higher in systemQueue, recaclulate greatest key.
 */
module.exports = compareSystemQueue = (oldKey, currentKey, systemQueue) => {
  if (currentKey[1] > oldKey[1]) {
    return calculateSystemQueue(systemQueue);
  } else {
    return currentKey;
  }
};
