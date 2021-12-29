const UserAuthModel = require("../models/UserAuthModel");

function createUser(email, password) {
  const newUser = new UserAuthModel({ email, password });
  return newUser.save();
}

function isEmailExist(email) {
  return UserAuthModel.exists({ email });
}

function findUserByEmail(email) {
  return UserAuthModel.findOne({ email });
}

module.exports = { createUser, isEmailExist, findUserByEmail };
