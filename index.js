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
/* Debug */
const { performance } = require("perf_hooks");

/* Configuration files */
const inputs = require("./data/inputs.json");
client.login(token).catch(error => console.error("Invalid token passed"));

/* System Queue */
const calculateSystemQueue = require("./systemqueue/calculateSystemQueue");
const compareSystemQueue = require("./systemqueue/compareSystemQueue");
const resetSystemQueue = require("./systemqueue/resetSystemQueue");
const calculateSystemMode = require("./systemqueue/calculateSystemMode");

// NOTE: Please remove randomInput after initial test. Random Input
// is only suppose to inject input to help seed latency test.
const randomInput = ["up", "down", "left", "right", "a", "b", "enter"];

let systemMode = { anarchy: 1, democracy: 0 }; //no system order = anarchy mode
let topInput = null; //topInput gets processed from systemQueue most frequent input value
let systemQueue = resetSystemQueue(); //reinitialize the values to 0
let checkQueue = 0; //checkqueue is used to minimize the calls on when to check the queue.
/**
 * Ready event occurs when we first login
 * Simply display color coded username, and usage (utils/usage.js)
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
  //TIMING LATENCY FUNCTIONALITY
  let timeStart = performance.now();
  // check if the message is trying to change system mode.
  if (message.content.includes("anarchy")) {
    systemMode["anarchy"]++;
  } else if (message.content.includes("democracy")) {
    systemMode["democracy"]++;
  }

  // if (message.author.bot) return;
  let msg = processMessage(message.content);
  if (msg !== null) {
    let userName = message.member.user.tag;
    let userColor = hexString(userName);
    let repeated = parseInt(msg["repeated"]); //number
    let multiKey = msg["multiKey"]; // boolean
    let userInput = msg["key"]; // string/char of key
    let activeMode = calculateSystemMode(systemMode);
    systemQueue[userInput]++;

    // update system queue, get top input after
    // every 20 inputs. This used to be calculated based on
    // time.
    if (checkQueue > 10) {
      checkQueue = 0;
      message.channel.send("Beep boop. I think its time to troll.");
      message.channel.send(
        randomInput[Math.floor(Math.random() * randomInput.length)]
      );
      topInput = calculateSystemQueue(systemQueue)[0];

      //at this point process the input if in democracy mode,
      systemQueue = resetSystemQueue();
    }
    checkQueue++;
    //determine how to input
    if (activeMode === "anarchy") {
      processKeys(userInput, repeated, multiKey);
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
    } else {
      message.channel.send(
        "Democracy has been enacted! Vote for your inputs you pleebs"
      );

      if (topInput == null) topInput = calculateSystemQueue(systemQueue)[0];
      console.log(`The input that would be processed is ${topInput}`);
      console.log(systemMode);
      // userInput = processMessage(topInput[0]);
      processKeys(topInput[0], 0, false);
    }

    //TIMER END FUNCTIONALITY
    let timeEnd = performance.now();
    console.log(
      `\t It took that message ${Math.floor(timeEnd - timeStart)} ms`
    );
  }
});
