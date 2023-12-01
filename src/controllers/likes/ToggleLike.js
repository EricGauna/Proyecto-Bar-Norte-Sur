const { selectLikeProblemaUser, addLike, removeLike } = require("../../Repositories/likes");
const { SelectProblemasId } = require("../../Repositories/problemas");
const { ProblemasIdSchema } = require("../../Schemas/problemas");
const { id } = require("../../Schemas/problemas/createProblemaSchema");
const { generateErrors } = require("../../utils");

const ToggleLike = async (req, res, next) => {
  try {
    const { id: problemasId } = req.params;
    console.log(id);

    await ProblemasIdSchema.validateAsync(
      problemasId
    );
    const problema = await SelectProblemasId(
      problemasId
    );

    if (!problema) {
      generateErrors(
        "The problem you are trying to like doesn't exist",
        404
      );
    }

    const loggedUserId = req.auth.id;

    const like = await selectLikeProblemaUser(
      problemasId,
      loggedUserId
    );

    let liked;
    let statusCode;

    if (like) {
      removeLike(problemasId, loggedUserId);
      liked = false;
      statusCode = 200;
    } else {
      addLike(problemasId, loggedUserId);
      liked = true;
      statusCode = 201;
    }

    res
      .status(statusCode)
      .send({ status: "ok", data: { liked } });
  } catch (error) {
    next(error);
  }
};

module.exports = ToggleLike;
