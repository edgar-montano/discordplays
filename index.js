/* Required Libraries  */
const robot = require("robotjs");
const chalk = require("chalk"); //chalk depedency will be deprecated soon
// const hex = require("string-hex"); deprecated
const Discord = require("discord.js");
/* Utilities and helper functions */
const token = require("./utils/auth")();
const client = new Discord.Client();
// const hexString = require("./utils/hexString"); deprecated
const processMessage = require("./process/message"); //previous processMessage deprecated
const processKeys = require("./process/keys"); //previous processKeys deprecated
/* Debug */
const { performance } = require("perf_hooks");
const DEBUG = false;
/* Configuration files */
const inputs = require("./data/inputs.json");
client.login(token).catch(error => console.error("Invalid token passed"));

/* System Queue */
const SystemQueue = require("./systemqueue/SystemQueue");
const systemQueue = new SystemQueue(inputs);
let votes = 0;

// NOTE: Please remove randomInput after initial test. Random Input
// is only suppose to inject input to help seed latency test.
const randomInput = ["up", "down", "left", "right", "a", "b", "enter"];
let checkQueue = 0; // used for bot

/**
 * UI setup, requires blessed grid and box setup
 */
const blessed = require("blessed");
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
  if (message.content.toLowerCase().includes("anarchy")) {
    systemQueue.updateSystemMode("anarchy");
    myScreen.systemModeUpdate(systemQueue.getSystemMode());
    // myScreen.systemModeUpdate(systemMode["democracy"], ++systemMode["anarchy"]);
  } else if (message.content.toLowerCase().includes("democracy")) {
    systemQueue.updateSystemMode("democracy");
    myScreen.systemModeUpdate(systemQueue.getSystemMode());
    // myScreen.systemModeUpdate(++systemMode["democracy"], systemMode["anarchy"]);
  } else {
    msg = processMessage(message.content);
  }

  // if (message.author.bot) return;

  if (msg !== null) {
    let userName = message.member.user.tag;
    let userInput = message.content.toLowerCase();
    // let userColor = hexString(userName);
    // let repeated = parseInt(msg["repeated"]); //number
    // let multiKey = msg["multiKey"]; // boolean
    // let userKey = msg["key"]; // string/char of key
    // let userInput = msg["userInput"];
    let activeMode = systemQueue.calculateActiveMode();
    // systemQueue[userInput]++;

    // totalInputs++;
    // myScreen.gauge.setData([systemMode["democracy"], systemMode["anarchy"]]);
    // topInput = calculateSystemQueue(systemQueue)[0];
    // let topInputKey = topInput[0];
    // let topInputCount = topInput[1];

    // let topInputPercent = myScreen.calculatePercent(topInputCount, totalInputs);
    // // NOTE: multiKey breaks this need to rework.
    // // myScreen.topInputUpdate(systemQueue)
    systemQueue.updateSystemQueue(userInput);

    myScreen.topInputUpdate(
      systemQueue.calculateTopInputPercent(),
      systemQueue.getTopInput()
    );

    //check every 11 votes
    //also check if we are in democracy mode.
    if (votes > 10) {
      votes = 0;
      //calculate proper input and render to screen
      if (activeMode === "democracy") {
        message.channel.send(
          "You have voted, and your votes have been tallied"
        );
        message.channel.send(
          "The most voted input has been: " +
            systemQueue.getTopInput() +
            " with a total of " +
            systemQueue.getTopInputCount() +
            " votes!"
        );
        myScreen.log(
          `{red-fg}VOTES ARE IN{/red-fg}:\t {green-fg}${topInputKey}{/green-fg} by ${topInputCount} votes`
        );
        myScreen.log(
          "{yellow-fg}Polls are closed, please vote again for next input{/yellow-fg}"
        );
        let democracyVotedInput = processMessage(systemQueue.getTopInput());
        // let democracyKey = democracyVotedInput["key"];
        // let democracyMultiKey = democracyVotedInput["multiKey"];
        processKeys(democracyVotedInput);
      }
      systemQueue.resetSystemQueue();
      // systemQueue = resetSystemQueue();
      totalInputs = 0;
    }

    // This is to seed more input for demo purposes.
    if (checkQueue > 10) {
      checkQueue = 0;
      message.channel.send("Beep boop. I think its time to troll.");
      message.channel.send(
        randomInput[Math.floor(Math.random() * randomInput.length)]
      );
    }
    checkQueue++;

    if (activeMode === "anarchy") {
      processKeys(msg);
      //TIMER END FUNCTIONALITY
      let timeEnd = performance.now();
      let totalTime = Math.floor(timeEnd - timeStart);
      myScreen.log(
        "{red-fg}" +
          userName.slice(0, 7).toUpperCase() +
          "{/red-fg} => {green-fg}" +
          msg +
          "{/green-fg}"
      );
    }
    votes++;
  }
  screen.render();
});

screen.key(["escape", "q", "C-c"], function(ch, key) {
  return process.exit(0);
});
