const processMultiKeys = require("../utils/processMultiKeys");
const testMultiKey = keys => {
  console.log(`Attempting to test ${keys.join(" ")}`);
  processMultiKeys(keys);
};

module.exports = testMultiKey;
