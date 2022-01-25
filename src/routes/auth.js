const express = require("express");
const router = express.Router();
const {
  signInSchema,
  signUpSchema,
  resetPasswordSchema,
  deleteAccountSchema,
  changePasswordSchema,
  updateProfileSchema
} = require("@core/lib/validations/authValidation");
const {
  signIn,
  signUp,
  generateNewTokens,
  signOut,
  forgotPassword,
  resetPassword,
  changePassword,
  deleteUserCredentials,
  updateProfile,
} = require("../controller/authController");
const {
  validateCredentials,
  validateValues,
  authenticateToken,
} = require("@core/lib/middleware/");

router.post("/signup", validateValues(signUpSchema), signUp);

router.post("/signin", validateValues(signInSchema), signIn);

router.delete("/signout", signOut);

router.delete(
  "/accounts",
  validateValues(deleteAccountSchema),
  validateCredentials,
  deleteUserCredentials
);

router.post("/forgot-password", forgotPassword);

router.patch(
  "/reset-password",
  validateValues(resetPasswordSchema),
  resetPassword
);

router.patch(
  "/change-password",
  validateValues(changePasswordSchema),
  authenticateToken,
  validateCredentials,
  changePassword
);

router.patch(
  "/update-profile",
  validateValues(updateProfileSchema),
  authenticateToken,
  validateCredentials,
  updateProfile
);

router.post("/token", generateNewTokens);

module.exports = router;
