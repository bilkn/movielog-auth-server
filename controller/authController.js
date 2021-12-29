const { hashSync, compareSync } = require("bcrypt");
const {
  createUser,
  isEmailExist,
  findUserByEmail,
} = require("../service/AuthService");
const { saveRefreshToken } = require("../service/RefreshTokenService");
const jwt = require("jsonwebtoken");

const createAccessToken = (data) => {
  return jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (data) => {
  return jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
    expiresIn: `${24 * 90}h`,
  });
};

async function signUp(req, res) {
  const { email, password } = req.body;

  try {
    if (await isEmailExist(email)) {
      return res.status(403).send({
        success: false,
        message: "That email address is already in use.",
      });
    }

    const hashedPassword = hashSync(password, 10);
    await createUser(email, hashedPassword);

    const accessToken = createAccessToken({ email });
    const refreshToken = createRefreshToken({ email });
    await saveRefreshToken(refreshToken);

    await res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
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

    const accessToken = createAccessToken({ email });
    const refreshToken = createRefreshToken({ email });
    await saveRefreshToken(refreshToken);

    res.status(200).send({ accessToken, refreshToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
}

module.exports = { signUp, signIn };
