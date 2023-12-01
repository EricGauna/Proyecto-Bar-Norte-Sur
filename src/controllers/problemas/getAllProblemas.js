const {
    SelectProblemas,
} = require("../../Repositories/problemas");
const {
    filterProblemasSchema,
} = require("../../Schemas/problemas");
const {
    selectProblemasImages
} = require("../../Repositories/problemas");

const getAllProblemas = async (req, res, next) => {
    try {
        await filterProblemasSchema.validateAsync(
            req.query
        );

        const problemas = await SelectProblemas(req.query);

        for (let i = 0; i < problemas.length; i++) {
            const problema = problemas[i];
            const problemasImages = await selectProblemasImages(problema.id);
            problema.images = problemasImages;
        }

        res
            .status(200)
            .send({ status: "ok", data: problemas });
    } catch (error) {
        next(error);
    }
};

module.exports = getAllProblemas 