const { selectPostById, updatePostById } = require("../../repositories/posts");
const { editPostSchema, postIdSchema } = require("../../schemas/posts");
const { generateError } = require("../../utils");

const editPost = async (req, res, next) => {
  try {
    // Recogemos de los path params el id del post a editar
    const { id } = req.params;

    // Validamos el id de los params para ver si cumple los requisitos establecidos en el postIdSchema
    await postIdSchema.validateAsync(id);

    // Llamamos al respositorio para seleccionar el post con dicho id de la DB
    const post = await selectPostById(id);

    // Si el post no existe, tiramos un error
    if (!post) {
      generateError("The post you are trying to update doesn't exist", 404);
    }

    // Nos traemos el ID del usuario logueado de req.auth (esta propiedad se crea en el middleware validateAuth)
    const loggedUserId = req.auth.id;

    // Si el id del dueño del post no es el mismo que el del usuario logueado, tiramos un error
    if (post.userId !== loggedUserId) {
      generateError("You don't have rights to edit this post", 401);
    }

    // Validamos el body de la petición para ver si cumple los requisitos establecidos en el createPostSchama (el cliente debe haber mandado por lo menos título o descripción)
    await editPostSchema.validateAsync(req.body);

    // Construimos un objeto que tiene todos los datos del post, pero sobreescribimos los valores que mande el cliente en el req.body
    const updatedPost = { ...post, ...req.body };

    // Llamamos al repositorio y le pasamos este objeto con los datos del post actualizados para que los introduzca en la DB
    await updatePostById(updatedPost);

    res.status(200).send({ status: "ok", data: updatedPost });
  } catch (error) {
    next(error);
  }
};

module.exports = editPost;
