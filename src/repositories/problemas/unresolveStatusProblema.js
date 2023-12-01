const getPool = require("../../Database/getPool");

const unresolveStatusProblema = async (id) => {
  const pool = getPool();

  await pool.query(
    "UPDATE problemas SET estado = 1 WHERE id = ?;",
    [id]
  );
};

module.exports = unresolveStatusProblema;
