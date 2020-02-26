/* Required Libraries  */
const robot = require("robotjs");
const chalk = require("chalk");
const hex = require("string-hex");
const Discord = require("discord.js");
/* Utilities and helper functions */
const token = require("./utils/auth")();
const client = new Discord.Client();
const hexString = require("./utils/hexString");
const processMessage = require("./utils/processMessage");
/* Configuration files */
const validInput = require("./data/validInput.json");

client.login(token);

/**
 * Ready event occurs when we first login
 * Simply display color coded username, and usage (utils/usage.js)
 * TODO: Send message announcing list of commands when first logged in.
 * */

client.on("ready", () => {
  let name = client.user.tag;
  console.info(chalk.hex(hexString(name)).underline(`Logged in as ${name}\n`));
  require("./utils/usage")(validInput);
});

client.on("message", message => {
  let msg = processMessage(message);
  if (msg !== null) {
    let userName = message.member.user.tag;
    let userColor = hexString(userName);
    let repeated = parseInt(msg["repeated"]);
    let userInput = validInput[msg["key"]];
    // log user input message
    console.log(
      chalk.hex(userColor).bold(userName) +
        "=> " +
        chalk.yellow(userInput) +
        " repeated:" +
        chalk.magentaBright(repeated) +
        " @ " +
        chalk.magenta(message.createdAt)
    );
    //execute keytap at least once
    do {
      robot.keyTap(userInput);
      repeated--;
    } while (repeated > 0);
  }
});
