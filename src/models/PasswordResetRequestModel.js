const mongoose = require("@core/lib/helpers/mongodb-connect");

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

const PasswordResetRequestModel = mongoose.model(
  "PasswordRequest",
  PasswordResetRequestSchema
);

module.exports = PasswordResetRequestModel;
