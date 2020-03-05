const inputs = require("../data/inputs.json");
/**
 * Reset system queue clears all the input values to recaculate most popular input.
 * This is to prevent the situation where one input will always remain the most popular input.
 * @return{Object} systemQueue - A zero'd systemQueue with all the inputs.
 */
const resetSystemQueue = () => {
  let systemQueue = {};
  let keys = {
    ...inputs["priorityKeys"],
    ...inputs["functionalKeys"],
    ...inputs["actionKeys"],
    ...inputs["directionalKeys"]
  };
  for (key in keys) {
    systemQueue[key] = 0;
  }
  return systemQueue;
};
module.exports = resetSystemQueue;
