module.exports = usage = inputs => {
  const usage = `The following commands are available: \n
    ${Object.keys(inputs).join(", ")}`;
  return usage;
};
