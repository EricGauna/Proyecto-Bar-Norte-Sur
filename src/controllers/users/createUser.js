const bcrypt = require("bcrypt");
const uuid = require("uuid");
const { selectUserByEmail, insertUser } = require("../../repositories/users");
const { createUserSchema } = require("../../schemas/users");
const { generateError, sendMail } = require("../../utils");

const createUser = async (req, res, next) => {
  try {
    // Validamos el body de la petición para ver si cumple los requisitos establecidos en el createUserSchema
    await createUserSchema.validateAsync(req.body);

    // Recogemos los datos de registro del body de la petición
    const { email, password, name } = req.body;

    // Llamamos al respositorio para que mire si hay algún usuario con ese emil en la DB
    const userWithSameEmail = await selectUserByEmail(email);

    // Si ya existe un usuario con ese email, tiramos un error
    if (userWithSameEmail) {
      generateError("Already exists an user with that email", 400);
    }

    // Encriptamos la contraseña del usuario (nunca se guarda en la DB sin encriptar)
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Generamos un código de registro aleatorio. Los usuarios que tienen un registrationCode en la DB, están pendiente de activar. Los que no tengan un registrationCode, ya están activados. La semana que viene, enviaremos este código de registro al email del usuario, para que él pueda hacer una petición al servidor que elimine dicho código de la DB y así activar su cuenta
    const registrationCode = uuid.v4();

    // Llamamos al respositorio para que introduzca en la DB todos los datos del usuario
    const insertId = await insertUser({
      email,
      encryptedPassword,
      name,
      registrationCode,
    });

    // Enviamos un email con un link que activa al usuario
    await sendMail(
      "¡Welcome to Travels APP!",
      `<p>Thanks for joining travelers! :D</p>
       <a href="http://localhost:8080/activate/${registrationCode}">Activate your account</a>`,
      email
    );

    res.status(201).send({ status: "ok", data: { id: insertId, email, name } });
  } catch (error) {
    next(error);
  }
};

module.exports = createUser;
