const {
  insertProblemas,
  insertProblemasImage,
} = require("../../Repositories/problemas");
const {
  createProblemasSchema,
} = require("../../Schemas/problemas");
const {
  addImage,
  } = require("../../utils");

const createProblemas = async (req, res, next) => {
  try {
    const userId = req.auth.id;

    await createProblemasSchema.validateAsync(
      req.body
    );

    const { title, description, barrio, ciudad } =
      req.body;
    
    const insertedProblemasId =
      await insertProblemas({
        title,
        description,
        barrio,
        ciudad,
        userId,
      });
    
    let images = req.files?.images || [];

    if (!Array.isArray(images)) {
      images = [images];
    }

    const uploadedImages = [];

    for (const image of images) {
      const imageName = await addImage(
        image.data
      ); 

      const insertedImageId =
        await insertProblemasImage(
          imageName,
          insertedProblemasId
        );

      uploadedImages.push({
        id: insertedImageId,
        images: imageName,
      });
    }

    res.status(201).send({
      status: "ok",
      data: {
        id: insertedProblemasId,
        title,
        description,
        barrio,
        ciudad,
        userId,
        images: uploadedImages,
      },
    });
    console.log("Problem created");
  } catch (error) {
    next(error);
  }
};

module.exports = createProblemas;
