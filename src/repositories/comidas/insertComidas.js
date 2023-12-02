const getPool = require("../../Database/getPool");

const insertComidas = async (comida) => {
  const { title, description , userId } = comida;

  const pool = getPool();

  const [{ insertId }] = await pool.query(
    "INSERT INTO comidas (title, description, userId ) VALUES (?, ?, ?)",
    [title, description, userId ]
  );

  return insertId;
};

module.exports = insertComidas;
