const {
  SelectProblemasId,
  resolveStatusProblemas,
  unresolveStatusProblemas,
} = require("../../Repositories/problemas");
const {
  ProblemasIdSchema,
} = require("../../Schemas/problemas");
const { generateErrors } = require("../../utils");

const toogleStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    await ProblemasIdSchema.validateAsync(id);

    const problema = await SelectProblemasId(id);


    if (!problema) {
      generateErrors(
        "The problem you are trying to resolve doesn't exist",
        404
      );
    }
    console.log(problema.estado);
    const problemResolvedFun = (problem) =>
    {
      if (problema.estado === 1) {
        resolveStatusProblemas(id);
        resolved = false;
        statusCode = 200;
       } else {
        unresolveStatusProblemas(id);
        resolved = true;
        statusCode = 201;
      }return problem
    }
    const data = problemResolvedFun(problema);
    res
      .status(statusCode)
      .send({ status: "ok", data: { data } });
  } catch (error) {
    next(error);
  }
};

module.exports = toogleStatus;
