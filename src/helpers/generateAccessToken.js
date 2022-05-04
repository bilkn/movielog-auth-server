const jwt = require("jsonwebtoken");

const generateAccessToken = (data) => {
  return jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
    expiresIn: "1h",
  });
};

module.exports = generateAccessToken;
