const checkRepeatValue = require("../utils/checkRepeatValue");
module.exports = testCheckRepeatValue = arr => {
  for (let i = 0; i < arr.length; i++) {
    console.log(`${arr[i]} contains a number: ${checkRepeatValue(arr[i])}`);
  }
};
