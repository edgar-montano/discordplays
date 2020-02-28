const chalk = require("chalk");
const log = console.log;

const usage = inputs => {
  const usage = `The following commands are available: \n
  priority keys are: ${Object.keys(inputs["priorityKeys"]).join(", ")}
  directional keys are: ${Object.keys(inputs["directionalKeys"]).join(", ")}
  action keys are: ${Object.keys(inputs["actionKeys"]).join(", ")}
  `;
  log(chalk.bold(usage));
  return usage;
};

module.exports = usage;
