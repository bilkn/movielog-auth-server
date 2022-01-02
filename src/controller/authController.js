const { hashSync, compareSync } = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const {
  createAccount,
  isEmailExist,
  findUserByEmail,
} = require("../service/AuthService");
const {
  createRefreshToken,
  isRefreshTokenExist,
  deleteRefreshToken,
} = require("../service/RefreshTokenService");
const {
  createPasswordResetRequest,
  getResetRequest,
} = require("../service/PasswordResetService");
const jwt = require("jsonwebtoken");
const { UserModel } = require("@core/lib");
const { sendPasswordResetLink } = require("../utils");

const generateAccessToken = (data) => {
  return jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
    expiresIn: "10s",
  });
};

const generateRefreshToken = (data) => {
  return jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
    expiresIn: `${24 * 90}h`,
  });
};

const createUser = (userID) => {
  return new UserModel({ id: userID }).save();
};

async function generateNewTokens(req, res) {
  const { token: refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);
  try {
    if (!(await isRefreshTokenExist(refreshToken))) {
      return res
        .status(403)
        .send({ message: "Refresh token couldn't be recognized." });
    }
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      async (err, user) => {
        if (err) return res.status(403).send({ success: false, message: err });
        console.log(user);

        await deleteRefreshToken(refreshToken);

        const { username } = user;
        const accessToken = generateAccessToken({ username });
        const newRefreshToken = generateRefreshToken({ username });
        await createRefreshToken(newRefreshToken);

        res.status(200).send({ accessToken, refreshToken: newRefreshToken });
      }
    );
  } catch (err) {
    res.status(500);
    console.log(err);
  }
}

async function signUp(req, res) {
  const { email, password } = req.body;

  try {
    if (await isEmailExist(email)) {
      return res.status(403).send({
        success: false,
        message: "That email address is already in use.",
      });
    }
    const [username] = email.split("@");
    const hashedPassword = hashSync(password, 10);
    const { _id } = await createAccount(email, username, hashedPassword);
    await createUser(_id);

    const accessToken = generateAccessToken({ username });
    const refreshToken = generateRefreshToken({ username });
    await createRefreshToken(refreshToken);

    await res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}

async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(403).send({
        success: false,
        message: "The email address or password is incorrect, please try again",
      });
    }

    if (!compareSync(password, user.password)) {
      return res.status(401).send({
        success: false,
        message:
          "The email address or password is incorrect, please try again.",
      });
    }
    const { username } = user;
    const accessToken = generateAccessToken({ username });
    const refreshToken = generateRefreshToken({ username });
    await createRefreshToken(refreshToken);

    res.status(200).send({ accessToken, refreshToken });
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}

async function signOut(req, res) {
  const { token } = req.body;
  if (!token) {
    return res.status(400).send({
      message: "Token is not provided, please provide refresh token.",
    });
  }
  try {
    await deleteRefreshToken(token);
    res.sendStatus(204);
  } catch (err) {
    res.send(500);
    console.log(err);
  }
}

async function resetPassword(req, res) {
  const { id, password } = req.body;
  if (!id)
    return res.status(400).send({
      message: "Reset request id is not provided, please provide request id.",
    });
  try {
    const resetRequest = await getResetRequest(id);
    const { email } = resetRequest;

    const user = await findUserByEmail(email);
    if (!user) {
      return res
        .status(404)
        .send({ message: "No user is found with this email." });
    }

    const hashedPassword = hashSync(password, 10);
    await user.updatePassword(hashedPassword);

    res
      .status(200)
      .send({ success: true, message: "Password is changed successfully." });
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}

async function forgotPassword(req, res) {
  const { email } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!email)
      return res
        .status(400)
        .send({ message: "Email is not provided, please provide email." });
    if (!user)
      return res
        .status(404)
        .send({ success: false, message: "No user is found with this email." });
    const id = uuidv4();
    const request = {
      id,
      email: user.email,
    };
    await createPasswordResetRequest(request);
    await sendPasswordResetLink(email, id);
    res.status(200).send({
      success: true,
      message: "Password reset link is sent successfully.",
      data: { email },
    });
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
}

module.exports = {
  signUp,
  signIn,
  signOut,
  forgotPassword,
  resetPassword,
  generateNewTokens,
};
