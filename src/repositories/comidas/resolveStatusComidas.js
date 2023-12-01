const getPool = require("../../Database/getPool");

const resolveStatusProblemas = async (id) => {
  const pool = getPool();

  await pool.query(
    "UPDATE problemas SET estado = 0 WHERE id = ?;",
    [id]
  );
};

module.exports = resolveStatusProblemas;
