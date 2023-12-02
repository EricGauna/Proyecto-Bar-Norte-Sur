const {
  SelectProblemas,
} = require("../../Repositories/problemas");
const {
  filterProblemasSchema,
} = require("../../Schemas/problemas");

const getProblemas = async (req, res, next) => {
  try {
    await filterProblemasSchema.validateAsync(
      req.query
    );

    const problemas = await SelectProblemas(req.query);

    res
      
      .status(200)
      .send({ status: "ok", data: problemas });
    console.log(problemas);
  } catch (error) {
    next(error);
  }
};

module.exports = getProblemas;
