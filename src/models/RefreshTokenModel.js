const mongoose = require("@core/lib/helpers/mongodb-connect");

const RefreshTokenSchema = new mongoose.Schema({
  token: String,
  blacklisted: {
    type: Boolean,
    default: false,
  },
});

const RefreshTokenModel = mongoose.model("RefreshToken", RefreshTokenSchema);

module.exports = RefreshTokenModel;
