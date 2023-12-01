const getPool = require("../../Database/getPool");

const addLike = async (problemasId, userId) => {
  const pool = getPool();

  const [{ insertId }] = await pool.query(
    "INSERT INTO likes (problemasId, userId) VALUES (?, ?)",
    [problemasId, userId]
  );

  return insertId;
};

module.exports = addLike;
