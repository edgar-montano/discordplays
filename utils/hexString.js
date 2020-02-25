const hex = require("string-hex");
const hexString = username => {
  return "#" + hex(username).slice(0, 5);
};
module.exports = hexString;
