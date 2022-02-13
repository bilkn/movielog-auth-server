const jwt = require("jsonwebtoken");

const generateAccessToken = (data) => {
  return jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
    // TODO: Change expiration duration.
    expiresIn: "24h",
  });
};

module.exports = generateAccessToken;
