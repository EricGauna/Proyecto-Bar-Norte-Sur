const getPool = require("../../Database/getPool");

const SelectProblemasId = async (id) => {
  const pool = getPool();

  const [[problema]] = await pool.query(
    "SELECT p.*, COUNT(l.id) likes FROM problemas p LEFT JOIN likes l ON p.id = l.problemasId WHERE p.id = ?;",
    [id]
  );
  if (!problema.id === null) {
    throw new Error(`No se encontró ningún problema con el id ${id}`);
  }

  return problema;
};

module.exports = SelectProblemasId;
