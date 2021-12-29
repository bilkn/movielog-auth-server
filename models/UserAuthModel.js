const mongoose = require("mongoose");
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/test");
}

const UserAuthSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const UserAuthModel = mongoose.model("UserAuth", UserAuthSchema);

module.exports = UserAuthModel;
