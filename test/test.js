const validKeys = require("../data/validInput.json");

// test usage
console.log("Testing usage...");
require("./testUsage")(validKeys);
console.log("[*] Usage test complete");

//test a specific key or key
console.log("Testing keyboard input");
require("./testKeys")("enter");
console.log("[*] Keyboard input test complete");
