const bcrypt = require("bcrypt");
const {
  selectUserByemail,
  insertUser,
} = require("../../Repositories/users");
const {
  createUserSchema,
} = require("../../Schemas/users");
const {
  generateErrors,
} = require("../../utils");

const createUser = async (req, res, next) => {
  try {
    await createUserSchema.validateAsync(
      req.body
    );

    const { email, password, name } = req.body;

    const userWithSameEmail =
      await selectUserByemail(email);

    if (userWithSameEmail) {
      generateErrors(
        "Already exists an user with that email",
        400
      );
    }

    const encryptedPassword = await bcrypt.hash(
      password,
      10
    );

    const insertId = await insertUser({
      email,
      encryptedPassword,
      name,
    });
    console.log("Usuario Creado");
    res.status(201).send({
      status: "ok",
      data: { id: insertId, email, name },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createUser;
