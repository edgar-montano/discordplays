const splitCharacters = require("../utils/splitCharacters");

test("Check Repeat Value for up9", () => {
  expect(splitCharacters("up9")).toEqual(["up", "p9"]);
});

test("Check Repeat Value for dwn9", () => {
  expect(splitCharacters("dwn9")).toEqual(["dw", "wn", "n9"]);
});

test("Check Repeat Value for as", () => {
  expect(splitCharacters("as")).toEqual(["as"]);
});
