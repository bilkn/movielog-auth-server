const mongoose = require("mongoose");
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/test");
}

const UserModel = new mongoose.Schema({
  watchList: {
    type: Array,
    default: [],
  },
  watchedList: {
    type: Array,
    default: [],
  },
});

const UserModel = mongoose.model("User", UserModel);

module.exports = UserModel;
