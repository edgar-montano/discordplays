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
const DEBUG = true;
/* Configuration files */
const inputs = require("./data/inputs.json");
client.login(token).catch(error => console.error("Invalid token passed"));

/* System Queue */
const calculateSystemQueue = require("./systemqueue/calculateSystemQueue");
// const compareSystemQueue = require("./systemqueue/compareSystemQueue");
const resetSystemQueue = require("./systemqueue/resetSystemQueue");
const calculateSystemMode = require("./systemqueue/calculateSystemMode");

// NOTE: Please remove randomInput after initial test. Random Input
// is only suppose to inject input to help seed latency test.
const randomInput = ["up", "down", "left", "right", "a", "b", "enter"];

let systemMode = { anarchy: 1, democracy: 0 }; //no system order = anarchy mode
let topInput = null; //topInput gets processed from systemQueue most frequent input value
let systemQueue = resetSystemQueue(); //reinitialize the values to 0
let checkQueue = 0; //checkqueue is used to minimize the calls on when to check the queue.
let votes = 0;

/**
 * UI setup, requires blessed grid and box setup
 */
const blessed = require("blessed");
const contrib = require("blessed-contrib");
const MyScreen = require("./ui/MyScreen");
let screen = blessed.screen({ smartCSR: true });
const myScreen = new MyScreen(screen, "Discord Plays");

/**
 * Ready event occurs when we first login
 * Simply display color coded username, and usage (utils/usage.js)
 * */

client.on("ready", () => {
  let name = client.user.tag;
  const usage = require("./utils/usage")(inputs);
  myScreen.setTextBox(`\t\tLogged in as ${name}\n${usage}`);
  const channel = client.channels.get(process.env.CHANNEL);
  if (channel) {
    channel.send(`Welcome, I am **${client.user.tag}!**\n\t${usage}`);
  }
  screen.render();
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
  // if the message does not contain a system mode command,
  //simply process it
  let msg = null;
  if (message.content.includes("anarchy")) {
    systemMode["anarchy"]++;
  } else if (message.content.includes("democracy")) {
    systemMode["democracy"]++;
  } else {
    msg = processMessage(message.content);
  }

  // if (message.author.bot) return;

  if (msg !== null) {
    let userName = message.member.user.tag;
    let userColor = hexString(userName);
    let repeated = parseInt(msg["repeated"]); //number
    let multiKey = msg["multiKey"]; // boolean
    let userInput = msg["key"]; // string/char of key
    let activeMode = calculateSystemMode(systemMode);
    systemQueue[userInput]++;
    gauge.setData([systemMode["democracy"], systemMode["anarchy"]]);

    //check every 11 votes
    //also check if we are in democracy mode.
    if (votes > 10) {
      votes = 0;
      topInput = calculateSystemQueue(systemQueue)[0];
      //note calculate proper percent
      donut.update([
        { percent: topInput[1], label: topInput[0], color: "red" }
      ]);
      if (activeMode === "democracy") {
        message.channel.send(
          "You have voted, and your votes have been tallied"
        );
        message.channel.send(
          "The most voted input has been: " +
            topInput[0] +
            " with a total of " +
            topInput[1] +
            " votes!"
        );
        processKeys(topInput[0], 0, false);
      }
      systemQueue = resetSystemQueue();
    }

    // This is to seed more input for demo purposes.
    if (checkQueue > 10 && DEBUG) {
      checkQueue = 0;
      message.channel.send("Beep boop. I think its time to troll.");
      message.channel.send(
        randomInput[Math.floor(Math.random() * randomInput.length)]
      );
    }
    checkQueue++;
    //determine how to input
    if (activeMode === "anarchy") {
      processKeys(userInput, repeated, multiKey);
      //NOTE: REMOTE SLICE BELOW AFTER DEMO
      // console.log(
      //   chalk.hex(userColor).bold(userName.slice(0, 4)) +
      //     "=> " +
      //     chalk.yellow(userInput) +
      //     " repeated:" +
      //     chalk.green(repeated) +
      //     " @ " +
      //     chalk.magenta(message.createdAt)
      // );
      log.log(
        "{red-fg}" +
          userName.slice(0, 5) +
          "{/red-fg} => " +
          userInput +
          "  {green-fg}" +
          repeated +
          "{/green-fg} times @" +
          "{yellow-fg}" +
          message.createdAt +
          "{/yellow-fg}"
      );
    }

    //TIMER END FUNCTIONALITY
    let timeEnd = performance.now();
    let totalTime = timeEnd - timeStart;
    votes++;
    if (activeMode === "anarchy")
      console.log(`\t It took that message ${Math.floor(totalTime)} ms`);
  }
  screen.render();
});

screen.key(["escape", "q", "C-c"], function(ch, key) {
  return process.exit(0);
});
