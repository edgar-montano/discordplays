/* Required Libraries  */
const robot = require("robotjs");
const chalk = require("chalk"); //chalk depedency will be deprecated soon
const hex = require("string-hex");
const Discord = require("discord.js");
/* Utilities and helper functions */
const token = require("./utils/auth")();
const client = new Discord.Client();
const hexString = require("./utils/hexString");
const processMessage = require("./utils/processMessage");
const processKeys = require("./utils/processKeys");

/* Configuration files */
const inputs = require("./data/inputs.json");
client.login(token).catch(error => console.error("Invalid token passed"));

/* System Queue */
const calculateSystemQueue = require("./systemqueue/calculateSystemQueue");
const compareSystemQueue = require("./systemqueue/compareSystemQueue");
const resetSystemQueue = require("./systemqueue/resetSystemQueue");

let systemMode = { anarchy: 1, democracy: 0 }; //no system order = anarchy mode
let topInput = null; //topInput gets processed from systemQueue most frequent input value
let systemQueue = resetSystemQueue(); //reinitialize the values to 0
let checkQueue = 0; //checkqueue is used to minimize the calls on when to check the queue.
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
    let repeated = parseInt(msg["repeated"]); //number
    let multiKey = msg["multiKey"]; // boolean
    // userInput now maps directly to proper key, no
    // more altKey and lookup tables
    let userInput = msg["key"]; // string/char of key
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

    //update system queue
    if (checkQueue > 500) {
      checkQueue = 0;
      // console.log(systemQueue);
    }
    systemQueue[userInput]++;
    checkQueue++;
  }
});
