const chalk = require("chalk");
const log = console.log;

const usage = (validKeys, alternativeKeys) => {
  const usage = `The following commands are available: \n
  priority keys are: ${Object.keys(alternativeKeys).join(", ")}
  noraml keys are: ${Object.keys(validKeys).join(", ")}
  `;
  log(chalk.yellowBright("The following commands are available:"));
  log("\t" + Object.keys(alternativeKeys).join(", "));
  log("\t" + chalk.green(Object.keys(validKeys).join(", ")));
  return usage;
};

module.exports = usage;
