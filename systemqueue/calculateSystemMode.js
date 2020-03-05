/**
 * calculates which system mode should be active,
 * only the mode with more than 50% should be active.
 * @param{Object} systemMode - dictionary of the values anarchy and democracy with number of votes for each
 * @return{String} democracy|anarchy - a string representing the active mode
 */
module.exports = calculateSystemMode = systemMode => {
  let total = systemMode["anarchy"] + systemMode["democracy"];
  //check which system mode is has more than 50% votes
  if (systemMode["democracy"] / total > 0.5) {
    return "democracy";
  } else {
    return "anarchy";
  }
};
