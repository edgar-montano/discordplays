/**
 * System Queue is primarily used for queuing the top inputs,
 * and executing top inputs in democracy mode.
 * @param{Object} inputs - inputs.json file used to populate the system queue.
 */
class SystemQueue {
  constructor(inputs) {
    this.topInput = null;
    this.systemQueue = {};
    this.systemMode = { democracy: 0, anarchy: 1 };
    this.totalInput = 0;
    for (this.input in inputs) {
      this.systemQueue[this.input] = 0;
    }
  }

  /**
   * Reset System Queue zero's the value of every input key in the queue.
   * This should be called after the execution of a key in democracy mode.
   */
  resetSystemQueue() {
    for (input in this.systemQueue) this.systemQueue[input] = 0;
    this.totalInput = 0; //fixes percent calculations issue
  }
  /**
   * Setter to update the value of the current input entered in the SystemQueue.
   * NOTE: This should call compareSystemInput explicitly to update the topInput value
   * @param {String} input - String of the desired input to increment by.
   * @return {Boolean} true if update was success, false if it could not update value
   */
  updateSystemQueue(input) {
    if (this.systemQueue[input] === undefined) return false;
    if (this.topInput === null) {
      this.topInput = input;
    }
    this.systemQueue[input]++;
    this.totalInput++;
    //if updated value is greater then also update topInput.
    if (this.systemQueue[input] > this.systemQueue[this.topInput])
      this.topInput = input;
    return true;
  }
  /**
   * Getter for top input field.
   * @return {String} top input string.
   */
  getTopInput() {
    return this.topInput;
  }

  /**
   * Get the top input count
   * @return {Number} - number of times top input was voted
   */
  getTopInputCount() {
    return this.systemQueue[this.topInput];
  }

  /**
   * Calculates the percent of top input / total input
   * @return {Number} Rounded floating number of percentage.
   */
  calculateTopInputPercent() {
    return Math.floor(
      (this.systemQueue[this.topInput] / this.totalInput) * 100
    );
  }

  /**
   * Returns an Object of the system mode values
   * @return {Object} systemMode - returns the system mode object, used to update ui.
   */
  getSystemMode() {
    return this.systemMode;
  }

  /**
   * Returns the systeMode with the highest value as a string.
   * @return {String} activeMode - return active mode as a string.
   */
  calculateActiveMode() {
    return this.systemMode["anarchy"] > this.systemMode["democracy"]
      ? "anarchy"
      : "democracy";
  }

  /**
   * Updates system mode count.
   * @param {String} mode - String of either "democracy" or "anarchy"
   */
  updateSystemMode(mode) {
    mode = mode.toLowerCase();
    if (mode === "democracy" || mode === "anarchy") this.systemMode[mode]++;
  }
  /**
   * Calculates a percentage of current system mode.
   * @param{String} mode - the mode to calculate percentage of
   * @return{Number} - percent value of selected mode
   */
  calculateSystemModePercent(mode) {
    let anarchyCount = this.systemMode["anarchy"];
    let democracyCount = this.systemMode["democracy"];
    let totalCount = anarchyCount + democracyCount;
    if (mode === "democracy")
      return Math.floor(democracyCount / totalCount) * 100;
    else return Math.floor(anarchyCount / totalCount) * 100;
  }

  // calculateTopInputPercent
  // getTopInputCount() {}
  // getTopInput() {}
  // getTotalInputCount() {}
  // getTopInputCount() {}
}

module.exports = SystemQueue;
