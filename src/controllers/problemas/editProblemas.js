const {
  SelectProblemasId,
  updateProblemasId,
  insertProblemasImage,
  deleteImagesProblema,
  selectProblemasImages,
} = require("../../Repositories/problemas");
const {
  editProblemasIdSchema,
  ProblemasIdSchema,
} = require("../../Schemas/problemas");
const { addImage, deleteImage } = require("../../utils");

const editProblemas = async (req, res, next) => {
  try {
    const { id } = req.params;

    await ProblemasIdSchema.validateAsync(id);

    
    const problema = await SelectProblemasId(id);
    const problemasImages = await selectProblemasImages(problema.id);
    problema.images = problemasImages;
    console.log(problema);

    if (!problema) {
      generateError(
        "The post you are trying to update doesn't exist",
        404
      );
    }

    await editProblemasIdSchema.validateAsync(req.body);

    const updatedProblema = { ...problema, ...req.body };

    await updateProblemasId(updatedProblema);

    let images = req.files?.images || [];
    console.log(images);

    if (!Array.isArray(images)) {
      images = [images];
    }

    const uploadedImages = [];

    if (images.length > 0) {
      await deleteImagesProblema(id);
      await deleteImage(problema.images)
      console.log(problema.images);
      for (const image of images) {
        const imageName = await addImage(image.data);
        const insertedImageId = await insertProblemasImage(
          imageName,
          problema.id
        );

        uploadedImages.push({
          id: insertedImageId,
          images: imageName,
        });
      }
    }

    res
      .status(200)
      .send({ status: "ok", data: updatedProblema });
  } catch (error) {
    next(error);
  }
};

module.exports = editProblemas;
