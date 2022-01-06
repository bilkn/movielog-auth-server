const express = require("express");
const router = express.Router();
const {
  signInSchema,
  signUpSchema,
  resetPasswordSchema,
  deleteAccountSchema,
} = require("@core/lib/validations/authValidation");
const validateValues = require("@core/lib/middleware/validationMiddleware");
const {
  signIn,
  signUp,
  generateNewTokens,
  signOut,
  forgotPassword,
  resetPassword,
  deleteUserCredentials,
} = require("../controller/authController");
const validateCredentials = require("../middleware/validateCredentials");

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

router.post("/token", generateNewTokens);

module.exports = router;
