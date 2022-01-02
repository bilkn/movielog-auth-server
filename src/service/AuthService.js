const UserAuthModel = require("../models/UserAuthModel");

function createAccount(email,username, password) {
  const newUser = new UserAuthModel({ email, username, password });
  return newUser.save();
}

function isEmailExist(email) {
  return UserAuthModel.exists({ email });
}

function findUserByEmail(email) {
  return UserAuthModel.findOne({ email });
}

module.exports = { createAccount, isEmailExist, findUserByEmail };