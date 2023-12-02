const {
  ProblemasIdSchema,
} = require("../../Schemas/problemas");
const {
  SelectProblemasId,
  selectProblemasImages,
} = require("../../Repositories/problemas");
const { generateErrors } = require("../../utils");



const getProblemasImage = async (req, res, next) => {
  try {
    const { id } = req.params;

    await ProblemasIdSchema.validateAsync(id);

    const problema = await SelectProblemasId(id);
    console.log(problema);

    if (problema.barrio === null) {
      generateErrors("Problem doesn't exist", 404);
    }

    const problemasImages = await selectProblemasImages(id);

    problema.images = problemasImages

    res
      .status(200)
      .send({ status: "ok", data: problema });
  } catch (error) {
    next(error);
  }
};

module.exports = getProblemasImage;
