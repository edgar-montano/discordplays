const chalk = require("chalk");
const log = console.log;

const usage = validKeys => {
  log(chalk.yellowBright("The following commands are available:"));
  log("\t" + chalk.green(Object.keys(validKeys).join(", ")));
};

module.exports = usage;
