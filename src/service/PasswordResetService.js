const PasswordResetRequestModel = require("../models/PasswordResetRequestModel");

function createPasswordResetRequest(request) {
  const passwordResetRequest = PasswordResetRequestModel(request);
  return passwordResetRequest.save();
}

function getResetRequest(id) {
  return PasswordResetRequestModel.findOne({ id });
}

module.exports = {
  createPasswordResetRequest,
  getResetRequest,
};
