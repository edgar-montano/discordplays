const validKeys = require("../data/validInput.json");

// test usage
console.log("Testing usage...");
require("./testUsage")(validKeys);
console.log("[*] Usage test complete");

console.log("Testing keyboard input");
require("./testKeys")("enter");
console.log("[*] Keyboard input test complete");
