const inputs = require(process.argv[2]) || require("../data/inputs.json");
const processKeys = require("../process/keys");
const processMessage = require("../process/message");

/**
 * Test process messages and keys
 * @param {String} msg - user message string
| */
testProcess = msg => {
  let key = processMessage(msg);
  console.log(key);
  if (key) processKeys(key);
};

const test = () => {
  testProcess("UP");
  testProcess("attack1");
  testProcess("down");
  testProcess("rUn");
};

setTimeout(test, 5000);
