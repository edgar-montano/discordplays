module.exports = usage = inputs => {
  const usage = `The following commands are available: \n
  directional keys are: ${Object.keys(inputs["directionalKeys"]).join(", ")}
  action keys are: ${Object.keys(inputs["actionKeys"]).join(", ")}
  `;
  return usage;
};
