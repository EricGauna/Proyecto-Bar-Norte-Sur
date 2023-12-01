const getPool = require("../../Database/getPool");

const deleteProblemasDb = async (id) => {
  const pool = getPool();

  await pool.query(
    "DELETE FROM problemas WHERE id = ?",
    [id]
  );
};

module.exports = deleteProblemasDb;
