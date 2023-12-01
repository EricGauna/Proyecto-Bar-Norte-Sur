const getPool = require("../../Database/getPool");

const deleteComidasDb = async (id) => {
  const pool = getPool();

  await pool.query(
    "DELETE FROM comidas WHERE id = ?",
    [id]
  );
};

module.exports = deleteComidasDb;
