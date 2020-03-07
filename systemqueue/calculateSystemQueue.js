/**
 * Calculate system queue for the most popular input.
 * @param{Object} systemQueue - Queue of all the inputs entered.
 * @return{Array} popularInput - An array [key, count] of the most popular inputs.
 */
module.exports = calculateSystemQueue = systemQueue => {
  //this could later be scaled to calculate top 3 inputs,
  //however due to time complexity, only restricting to the most popular
  let popularInput = [];
  let count = 0;
  let key;

  for (item in systemQueue) {
    if (systemQueue[item] > count) {
      count = systemQueue[item];
      key = item;
    }
  }
  popularInput.push([key, count]);
  return popularInput;
};
