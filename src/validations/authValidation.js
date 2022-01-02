const yup = require("yup");

const sharedPasswordValidaton = yup
  .string()
  .required("Password field must not be empty!")
  .min(6, "Password must be at least 6 character.");

const signUpSchema = yup.object({
  email: yup
    .string()
    .required("Email field must not be empty!")
    .email("Please provide valid email."),
  password: sharedPasswordValidaton,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords don't match!")
    .required("Confirm password field must not be empty!"),
});

const signInSchema = yup.object({
  email: yup
    .string()
    .required("Email field must not be empty!")
    .email("Please provide valid email."),
  password: yup.string().required("Password field must not be empty!"),
});

const resetPasswordSchema = yup.object({
  password: sharedPasswordValidaton,
});

module.exports = { signInSchema, signUpSchema, resetPasswordSchema };
