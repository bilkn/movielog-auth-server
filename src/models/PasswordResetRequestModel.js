const mongoose = require("mongoose");
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/test");
}

const PasswordResetRequestSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const PasswordREsetRequestModel = mongoose.model(
  "PasswordRequest",
  PasswordResetRequestSchema
);

module.exports = PasswordREsetRequestModel;
