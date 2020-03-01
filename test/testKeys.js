const processSingleKey = require("../utils/processSingleKey");

const testKey = (key, repeated) => {
  processSingleKey(key, repeated);
  console.log(`Attempting to input key: ${key} ${repeated} times`);
};

module.exports = testKey;
