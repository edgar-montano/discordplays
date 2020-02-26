let bot = require("robotjs");

const testKey = key => {
  bot.keyTap(key);
  console.log(`Attempting to input key: ${key}`);
};

module.exports = testKey;
