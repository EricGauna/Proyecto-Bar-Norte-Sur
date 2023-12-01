const jwt = require("jsonwebtoken");
const { generateErrors } = require("../utils");

const validateAuth = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      generateErrors(
        "Missing authorization header",
        400
      );
    }

    const [type, token] =
      authorization.split(" ");

    if (type !== "Bearer" || !token) {
      generateErrors("Invalid token format", 400);
    }

    const tokenPayload = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.auth = tokenPayload;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateAuth;
