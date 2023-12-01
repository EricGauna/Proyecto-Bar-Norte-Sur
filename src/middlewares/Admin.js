const {
  SelectUserId,
} = require("../Repositories/users");
const { generateErrors } = require("../utils");

const Admin = async (req, res, next) => {
  try {
    const loggedUserId = req.auth.id;

    const user = await SelectUserId(loggedUserId);

    if (user.role !== "admin") {
      generateErrors(
        "You dont't have permissions to perform this action",
        403
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = Admin;
