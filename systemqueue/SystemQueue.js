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
    for (input in inputs) this.systemQueue[input] = 0;
  }

  /**
   * Reset System Queue zero's the value of every input key in the queue.
   * This should be called after the execution of a key in democracy mode.
   */
  resetSystemQueue() {
    for (input in this.systemQueue) this.systemQueue[input] = 0;
  }
  /**
   * Setter to update the value of the current input entered in the SystemQueue.
   * NOTE: This should call compareSystemInput explicitly to update the topInput value
   * @param {String} input - String of the desired input to increment by.
   * @return {Boolean} true if update was success, false if it could not update value
   */
  updateSystemQueue(input) {
    if (this.systemQueue[input] === undefined) return false;
    if (this.topInput === null) this.topInput = input;
    this.systemQueue[input]++;
    return true;
  }
}

module.exports = SystemQueue;
