const getPool = require("../../Database/getPool");

const selectUserId = async (id) => {
  const pool = getPool();

  const [[user]] = await pool.query(
    "SELECT * FROM users WHERE id = ?",
    [id]
  );

  return user;
};

module.exports = selectUserId;
