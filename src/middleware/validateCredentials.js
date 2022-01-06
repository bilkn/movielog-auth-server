const { compareSync } = require("bcrypt");
const { findUserByID } = require("../service/AuthService");

async function validateCredentials(req, res, next) {
  const { id, password } = req.body;
  try {
    const user = await findUserByID(id);

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "No user is found by given id!" });
    }

    if (!compareSync(password, user.password)) {
      return res
        .send(401)
        .send({ success: false, message: "Wrong password, please try again!" });
    }

    next();
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "An error occurred on the auth server.",
    });
    console.log(err);
  }
}

module.exports = validateCredentials;
