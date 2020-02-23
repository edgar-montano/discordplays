require("dotenv").config();
/**
 * Checks to see if a token is specified in the application.
 * @return {string} The token if specified.
 */
const auth = () => {
  let token = process.argv.slice(2)[0] || process.env.TOKEN;
  if (!token) {
    console.log(
      `Please enter a valid token by either:
      \n\t1. Passing the token as an argument
      \n\t2. Creating a .env file in the root of this project with
        value TOKEN=your_token_id.\n`
    );
    throw new Error("Valid token not specified");
  }
  return token;
};

module.exports = auth;
