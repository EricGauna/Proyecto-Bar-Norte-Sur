const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  selectUserByemail,
} = require("../../Repositories/users");
const {
  loginSchema,
} = require("../../Schemas/users");
const { generateErrors } = require("../../utils");

const loginUsers = async (req, res, next) => {
  try {
    await loginSchema.validateAsync(req.body);

    const { email, password } = req.body;

    const user = await selectUserByemail(email);
    console.log(user);
    const { name, role, id } = user
    if (!user) {
      generateErrors("Wrong email or pass", 400);
    }

    const isPassOk = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPassOk) {
      generateErrors(
        "Wrong email or password",
        400
      );
    }

    const tokenPayload = { id: user.id };

    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
console.log("User Logged");
    res
      .status(200)
      .send({ status: "ok", data: { email, token, role, name, id } });
  } catch (error) {
    next(error);
  }
};

module.exports = loginUsers;
