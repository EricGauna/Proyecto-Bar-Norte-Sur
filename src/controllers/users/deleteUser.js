const { generateErrors } = require("../../utils");
const {
  UserIdSchema,
} = require("../../Schemas/users");
const {
  SelectUserId,
  DeleteUserDB,
} = require("../../Repositories/users");

const DeleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    await UserIdSchema.validateAsync(id);

    const user = await SelectUserId(id);

    if (!user) {
      generateErrors("User doesn't exist", 404);
    }

    await DeleteUserDB(id);

    res.status(200).send({
      status: "ok",
      message: "User deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = DeleteUser;
