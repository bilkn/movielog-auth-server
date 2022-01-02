const express = require("express");
const router = express.Router();
const { signInSchema, signUpSchema } = require("../validations/authValidation");
const validateValues = require("@core/lib/middleware/validationMiddleware");
const {
  signIn,
  signUp,
  generateNewTokens,
} = require("../controller/authController");

router.post("/signup", validateValues(signUpSchema), signUp);
router.post("/signin", validateValues(signInSchema), signIn);
router.post("/token", generateNewTokens);

module.exports = router;
