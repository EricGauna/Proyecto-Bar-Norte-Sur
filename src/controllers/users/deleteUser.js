const { generateError } = require("../../utils");
const { userIdSchema } = require("../../schemas/users");
const { selectUserById, deleteUserById } = require("../../repositories/users");

const deleteUser = async (req, res, next) => {
  try {
    // Recogemos de los path params el "id" del usuario que se quiere eliminar
    const { id } = req.params;

    // Validamos el id de los params para ver si cumple los requisitos establecidos en el userIdSchema
    await userIdSchema.validateAsync(id);

    // Llamamos al repositorio para que seleccione el user con ese id en la DB
    const user = await selectUserById(id);

    // Si no existe el user, lanzamos un error
    if (!user) {
      generateError("User doesn't exist", 404);
    }

    // Si el user existe, llamamos al repositorio para que lo elimine de la DB
    await deleteUserById(id);

    // Enviamos una respuesta con status 200 e indicando que el user se ha borrado correctamente
    res.status(200).send({ status: "ok", message: "User deleted succesfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteUser;
