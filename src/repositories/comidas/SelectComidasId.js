const getPool = require("../../Database/getPool");

const SelectComidasId = async (id) => {
  const pool = getPool();

  const [[comida]] = await pool.query(
    "SELECT p.*, COUNT(l.id) likes FROM comidas p LEFT JOIN likes l ON p.id = l.comidasId WHERE p.id = ?;",
    [id]
  );
  if (!comida.id === null) {
    throw new Error(`No se encontró ninguna comida con el id ${id}`);
  }

  return comida;
};

module.exports = SelectComidasId;
