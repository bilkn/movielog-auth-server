const PasswordResetRequestModel = require("../models/PasswordResetRequestModel");

function createPasswordResetRequest(request) {
  const passwordResetRequest = PasswordResetRequestModel(request);
  return passwordResetRequest.save();
}

module.exports = {
  createPasswordResetRequest,
};
