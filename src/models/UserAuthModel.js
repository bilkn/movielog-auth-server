const mongoose = require("mongoose");
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/test");
}

const UserAuthSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    default: 1,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
});

function updatePassword(password) {
  this.password = password;
  return this.save();
}

UserAuthSchema.methods = { updatePassword };

const UserAuthModel = mongoose.model("accounts", UserAuthSchema);

module.exports = UserAuthModel;
