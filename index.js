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
const processKeys = require("./utils/processKeys");
const resetSystemQueue = require("./systemqueue/resetSystemQueue");

/* Configuration files */
const inputs = require("./data/inputs.json");
client.login(token).catch(error => console.error("Invalid token passed"));

/* System Queue */
let systemMode = { anarchy: 1, democracy: 1 }; //no system order = anarchy mode
let systemQueue = resetSystemQueue();
/**
 * Ready event occurs when we first login
 * Simply display color coded username, and usage (utils/usage.js)
 * TODO: Send message announcing list of commands when first logged in.
 * */

client.on("ready", () => {
  let name = client.user.tag;
  console.info(chalk.hex(hexString(name)).underline(`Logged in as ${name}\n`));
  const usage = require("./utils/usage")(inputs);
  const channel = client.channels.get(process.env.CHANNEL);
  if (channel) {
    channel.send(`Welcome, I am **${client.user.tag}!**\n\t${usage}`);
  }
});

/**
 * Handle error event.
 */
client.on("error", error =>
  console.error(chalk.red(`An error has occured ${error}`))
);
/**
 * Process each message, if message contains input,
 * simulate the input.
 */
client.on("message", message => {
  if (message.author.bot) return; //prevents bot-ception
  let msg = processMessage(message);
  if (msg !== null) {
    let userName = message.member.user.tag;
    let userColor = hexString(userName);
    let repeated = parseInt(msg["repeated"]);
    let multiKey = msg["multiKey"];
    // userInput now maps directly to proper key, no
    // more altKey and lookup tables
    let userInput = msg["key"];
    // log user input message, if we log after do-while loop
    // the repeated value will not reflect initial input
    //NOTE: REMOTE SLICE BELOW AFTER DEMO
    console.log(
      chalk.hex(userColor).bold(userName.slice(0, 4)) +
        "=> " +
        chalk.yellow(userInput) +
        " repeated:" +
        chalk.green(repeated) +
        " @ " +
        chalk.magenta(message.createdAt)
    );

    processKeys(userInput, repeated, multiKey);
  }
});
