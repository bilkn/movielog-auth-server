const express = require("express");
const router = express.Router();
const {
  signInSchema,
  signUpSchema,
} = require("../../validations/authValidation");
const validateValues = require("../../middleware/auth/validateValues");
const { signIn, signUp } = require("../../controller/authController");

router.post("/signup", validateValues(signUpSchema), signUp);
router.post("/signin", validateValues(signInSchema), signIn);

module.exports = router;
