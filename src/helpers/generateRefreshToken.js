const jwt = require("jsonwebtoken");

const generateRefreshToken = (data) => {
  return jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
    expiresIn: `${24 * 90}h`,
  });
};

module.exports = generateRefreshToken;
