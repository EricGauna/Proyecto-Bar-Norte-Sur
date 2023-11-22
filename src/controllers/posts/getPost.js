const { postIdSchema } = require("../../schemas/posts");
const {
  selectPostById,
  selectPostImages,
} = require("../../repositories/posts");
const { generateError } = require("../../utils");

const getPost = async (req, res, next) => {
  try {
    // Nos traemos el id que envía el cliente en los params
    const { id } = req.params;

    // Validamos el id para ver si cumple los requisitos establecidos en el postIdSchema
    await postIdSchema.validateAsync(id);

    // Seleccionamos el post de la DB que tiene dicho id
    const post = await selectPostById(id);

    // Si el post no existe, lanzamos un error
    if (!post) {
      generateError("Post doesn't exist", 404);
    }

    // Seleccionamos las imágenes que tiene el post en la DB
    const postImages = await selectPostImages(id);

    // Creamos una propiedad "images" en el objeto del post y guardamos en ella el array de imágenes recogidas de la DB
    post.images = postImages;

    // Enviamos los datos del post con sus imágenes al cliente
    res.status(200).send({ status: "ok", data: post });
  } catch (error) {
    next(error);
  }
};

module.exports = getPost;
