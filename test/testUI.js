const MyScreen = require("../ui/MyScreen");
const blessed = require("blessed");
const contrib = require("blessed-contrib");

const testUI = msg => {
  let screen = blessed.screen({ smartCSR: true });
  let myScreen = new MyScreen(screen, "Discord Plays");
  myScreen.log(msg);

  let i;

  setInterval(function() {
    i = Math.floor(Math.random() * 100);
    let j = Math.floor(Math.random() * 10);
    myScreen.log(`LONGU\t\t{red-fg}${i}{/red-fg}\t\t${j} times`);
    myScreen.topInputUpdate(i, "up");
    myScreen.systeModeUpdate(i, 100 - i);
  }, 500);
  //   myScreen.render();
};
testUI("Hello world");
