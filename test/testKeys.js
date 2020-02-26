let bot = require("robotjs");

const testKey = key => {
  bot.keyTap(key);
};

module.exports = testKey;
