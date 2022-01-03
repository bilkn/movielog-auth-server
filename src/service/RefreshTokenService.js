const RefreshTokenModel = require("../models/RefreshTokenModel");

function createRefreshToken(token) {
  const refreshToken = new RefreshTokenModel({ token });
  return refreshToken.save();
}

function deleteRefreshToken(token) {
  return RefreshTokenModel.deleteOne({ token });
}

function isRefreshTokenExist(token) {
  return RefreshTokenModel.exists({ token });
}


module.exports = { createRefreshToken, deleteRefreshToken, isRefreshTokenExist };
