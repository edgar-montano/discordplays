const processSentence = require("../process/sentence");

test("Check the following string 'as' ", () => {
  expect(processSentence("as")).toBe("a");
});

test("Check the following string 'dwn' ", () => {
  expect(processSentence("dwn")).toBe("d");
});

//NOTE: TODO: THIS REQUIRES splitCharacters to be implemented.
// test("Checking the following string 'atck1'", () => {
//   expect(processSentence("atck1")).toBe("attack1");
// });
