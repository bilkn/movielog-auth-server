const { UserModel } = require("@core/lib");

function createUser(userID) {
  return new UserModel({ id: userID }).save();
}

module.exports = {
  createUser,
};
