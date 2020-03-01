const resetSystemQueue = require("../utils/resetSystemQueue");

module.exports = testSystemQueue = () => {
  let systemQueue = resetSystemQueue();
  return systemQueue;
};
