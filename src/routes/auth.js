const express = require("express");
const router = express.Router();
const {
  signInSchema,
  signUpSchema,
  resetPasswordSchema,
} = require("../validations/authValidation");
const validateValues = require("@core/lib/middleware/validationMiddleware");
const {
  signIn,
  signUp,
  generateNewTokens,
  signOut,
  forgotPassword,
  resetPassword,
} = require("../controller/authController");

router.post("/signup", validateValues(signUpSchema), signUp);

router.post("/signin", validateValues(signInSchema), signIn);

router.delete("/signout", signOut);

router.post("/forgot-password", forgotPassword);

router.patch(
  "/reset-password",
  validateValues(resetPasswordSchema),
  resetPassword
);

router.post("/token", generateNewTokens);

module.exports = router;
