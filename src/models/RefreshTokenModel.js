const RefreshTokenSchema = new Mongoose.Schema({
  token: String,
  blacklisted: {
    type: Boolean,
    default: false,
  },
});

const RefreshTokenModel = Mongoose.model("RefreshToken", RefreshTokenSchema);

module.exports = RefreshTokenModel;
