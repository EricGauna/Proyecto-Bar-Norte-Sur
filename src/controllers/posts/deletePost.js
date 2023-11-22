const { selectPostById, deletePostById } = require("../../repositories/posts");
const { postIdSchema } = require("../../schemas/posts");
const { generateError } = require("../../utils");

const deletePost = async (req, res, next) => {
  try {
    // Recogemos de los path params el "id" del post que el usuario quiere eliminar
    const { id } = req.params;

    // Validamos el id de los params para ver si cumple los requisitos establecidos en el postIdSchema
    await postIdSchema.validateAsync(id);

    // Llamamos al repositorio para que seleccione el post con ese id en la DB
    const post = await selectPostById(id);

    // Si no existe el post, lanzamos un error
    if (!post) {
      generateError("Post doesn't exist", 404);
    }

    // Nos traemos el ID del usuario logueado de req.auth (esta propiedad se crea en el middleware validateAuth)
    const loggedUserId = req.auth.id;

    // Si el id del dueño del post no es el mismo que el del usuario logueado, tiramos un error
    if (post.userId !== loggedUserId) {
      generateError("You don't have rights to delete this post", 401);
    }

    // Si el post existe, llamamos al repositorio para que lo elimine de la DB
    await deletePostById(id);

    // Enviamos una respuesta con status 200 e indicando que el post se ha borrado correctamente
    res.status(200).send({ status: "ok", message: "Post deleted succesfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = deletePost;
