const getPool = require("../../Database/getPool");

const DeleteUserDB = async (id) => {
  const pool = getPool();

  await pool.query(
    "DELETE FROM users WHERE id = ?",
    [id]
  );
};

module.exports = DeleteUserDB;
