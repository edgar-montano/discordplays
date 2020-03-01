const inputs = require("../data/inputs.json");
const resetSystemQueue = () => {
  let systemQueue = {};
  let keys = {
    ...inputs["priorityKeys"],
    ...inputs["functionalKeys"],
    ...inputs["actionKeys"],
    ...inputs["directionalKeys"]
  };
  //generate a dictionary with the "key" has the key,
  // and the number of times its been inputted as the value
  for (key in keys) {
    systemQueue[key] = 0;
  }
  return systemQueue;
};
module.exports = resetSystemQueue;
