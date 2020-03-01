//test a single key input, repeated
console.log("[!] Testing keyboard input");
require("./testKeys")("up", 5);
console.log("[*] Keyboard input test complete");

//test multi key functions, such as quick save.
console.log("[!] Testing multiKey input");
require("./testMultiKey")(["shift", "f1"]);
require("./testMultiKey")(["down", "up"]);
console.log("[*] Testing multiKey complete");

console.log("[!] Testing resetSystemQueue");
require("./testSystemQueue")();
console.log("[*] Testing resetSystemQueue complete");
