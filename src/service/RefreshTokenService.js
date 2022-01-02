const RefreshTokenModel = require("../models/RefreshTokenModel");

function saveRefreshToken(token) {
  const refreshToken = new RefreshTokenModel({ token });
  return refreshToken.save();
}

function deleteRefreshToken(token) {
  return RefreshTokenModel.deleteOne({ token });
}

function isRefreshTokenExist(token) {
  return RefreshTokenModel.exists({ token });
}


module.exports = { saveRefreshToken, deleteRefreshToken, isRefreshTokenExist };
