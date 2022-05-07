const PasswordResetRequestSchema = new Mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const PasswordResetRequestModel = Mongoose.model(
  "PasswordRequest",
  PasswordResetRequestSchema
);

module.exports = PasswordResetRequestModel;
