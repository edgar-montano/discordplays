const resetSystemQueue = require("../systemqueue/resetSystemQueue");

module.exports = testResetSystemQueue = () => {
  let systemQueue = resetSystemQueue();
  console.log(` systemQueue is ${systemQueue}`);
  return systemQueue;
};
