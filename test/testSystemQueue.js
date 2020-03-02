const resetSystemQueue = require("../systemqueue/resetSystemQueue");
const calculateSystemQueue = require("../systemqueue/calculateSystemQueue");
module.exports = testSystemQueue = systemQueue => {
  let ret = calculateSystemQueue(systemQueue);
  return ret;
};
