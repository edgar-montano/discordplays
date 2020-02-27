const chalk = require("chalk");
const log = console.log;

const usage = (validKeys, alternativeKeys) => {
  log(chalk.yellowBright("The following commands are available:"));
  log("\t" + Object.keys(alternativeKeys).join(", "));
  log("\t" + chalk.green(Object.keys(validKeys).join(", ")));
};

module.exports = usage;
