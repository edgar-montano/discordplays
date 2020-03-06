console.log("[!] Testing calculateSystemQueue");
console.log(
  require("./testSystemQueue.js")({
    up: 100,
    down: 5,
    right: 30,
    left: 40,
    a: 2,
    b: 2000
  })
);
console.log("[*] Testing calculateSystemQueue Complete");

console.log("[!] Testing resetSystemQueue");
console.log(require("../systemqueue/resetSystemQueue")());
console.log("[*] Testing resetSystemQueue complete");

//test a single key input, repeated
console.log("[!] Testing keyboard input");
require("./testKeys")("up", 5);
console.log("[*] Keyboard input test complete");

//test multi key functions, such as quick save.
console.log("[!] Testing multiKey input");
require("./testMultiKey")(["shift", "f1"]);
require("./testMultiKey")(["down", "up"]);
console.log("[*] Testing multiKey complete");

console.log("[!] Testing checkRepeatValue");
require("./testCheckRepeatValue")(["up", "down9", "a1", "a0", "start"]);
console.log("[*] Testing checkRepeatValue");
