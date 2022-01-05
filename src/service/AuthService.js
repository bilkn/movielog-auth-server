const UserAuthModel = require("../models/UserAuthModel");

async function createAccount(email, username, password) {
  const userCount = await UserAuthModel.countDocuments({});
  const newUser = new UserAuthModel({
    id: userCount + 1,
    email,
    username,
    password,
  });
  return newUser.save();
}

function isEmailExist(email) {
  return UserAuthModel.exists({ email });
}

function deleteAccount(id) {
  return UserAuthModel.findByIdAndDelete(id);
}

function findUserByID(id) {
  return UserAuthModel.findOne({ id });
}

function findUserByEmail(email) {
  return UserAuthModel.findOne({ email });
}

module.exports = {
  createAccount,
  isEmailExist,
  findUserByID,
  findUserByEmail,
  deleteAccount,
};
