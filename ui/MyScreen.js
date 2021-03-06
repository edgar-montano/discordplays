const blessed = require("blessed");
const contrib = require("blessed-contrib");
/**
 * MyScreen is a class to contain the UI elements, specifically
 * blessed and blessed-contrib objects.
 * @param{Object} screen - The main screen instance to operate on.
 * @param{String} title - The title of our main window.
 */
class MyScreen {
  constructor(screen, title) {
    // Our screen will be using 3 widgets, and have a grid-based layout.
    this.screen = screen;
    this.screen.title = title;
    //setup grid to be 12x12
    this.grid = new contrib.grid({
      rows: 12,
      cols: 12,
      screen: this.screen
    });
    //gauge is used to determine democracy vs anarchy meter
    this.gauge = this.grid.set(0, 0, 2, 12, contrib.gauge, {
      label: "Democracy vs Anarchy",
      percent: [0, 100]
    });
    //donut represents our topUserInput, could be extended later
    //on for multiple inputs (just pass multiple values in data array)
    this.donut = this.grid.set(2, 0, 2, 12, contrib.donut, {
      label: "top inputs",
      radius: 8,
      archWidth: 4,
      yPadding: 2,
      data: [{ percent: 0, label: "key", color: "green" }]
    });
    //input log replaces our chalk and console log functionality
    //displays all the users inputs
    this.inputLog = this.grid.set(4, 0, 6, 12, contrib.log, {
      label: "User Inputs",
      tags: true,
      border: { type: "line", fg: "cyan" }
    });

    //box to display inputs
    this.box = this.grid.set(10, 0, 2, 12, blessed.box, {
      content: "\t\tDiscord Plays\n\t\t edgar-montano"
    });
    //we need to render to initialize screen
    this.screen.render();
  }
  /**
   * Sets the string of the text box on bottom widget.
   * @param {String} msg - A string of the message to display in bottom widget text box.
   */
  setTextBox(msg) {
    this.box.setContent(msg);
    this.render();
  }

  /**
   * Simply logs the message you wish to in the inputLog widget.
   * @param {String} msg - The message you wish to log.
   */
  log(msg) {
    this.inputLog.log(msg);
    this.render();
  }

  /**
   * Updates the donut widget to display the current top input and the
   * percentage of how many votes that input has gotten.
   * @param {Number} percent - The percent of the top input.
   * @param {String} input - A string representing the top input.
   */
  topInputUpdate(percent, input) {
    this.donut.update([
      {
        percent: percent,
        label: input,
        color: "red"
      }
    ]);
    this.render();
  }
  /**
   * Update the gauge widget with the appropriate percentage of
   * democracy vs anarchy votes.
   * @param {Object} systemMode - Object containing 'democracy' and 'anarchy' count.
   */
  systemModeUpdate(systemMode) {
    let democracy = systemMode["democracy"];
    let anarchy = systemMode["anarchy"];
    let total = democracy + anarchy;
    let democracyTally = Math.floor((democracy / total) * 100);
    let anarchyTally = Math.floor((anarchy / total) * 100);
    this.gauge.setData([democracyTally, anarchyTally]);
    this.render();
  }
  /**
   * Calculates the percentage of the topInput and how many times it was voted
   * overall. Should be used in conjuction with topInputUpdate()
   * @param {Number} topInput - Number of times topInput was pressed
   * @param {Number} totalInputs - Total number of all collective votes.
   * @return {Number} percentage - percentage of topInput/totalInput
   */
  calculatePercent(topInput, totalInputs) {
    return Math.floor((topInput / totalInputs) * 100);
  }
  /**
   * Call this after every action to update screen.
   */
  render() {
    this.screen.render();
  }
}
module.exports = MyScreen;
