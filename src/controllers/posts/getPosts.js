const { selectPosts } = require("../../repositories/posts");
const { filterPostsSchema } = require("../../schemas/posts");

const getPosts = async (req, res, next) => {
  try {
    // Los filtros siempre se envían por query params (ejemplo, GET /posts?title=viaje&des). Validamos los query params de la petición para ver si cumple los requisitos establecidos en el filterPostsSchema (solo se permiten los filtros title y description)
    await filterPostsSchema.validateAsync(req.query);

    // Llamamos al repositorio para que seleccione los posts de la DB y le mandamos req.query (los filtros enviados por el cliente)
    const posts = await selectPosts(req.query);

    // Enviamos una respuesta con status 200 y los posts recogidos de la DB
    res.status(200).send({ status: "ok", data: posts });
  } catch (error) {
    next(error);
  }
};

module.exports = getPosts;
