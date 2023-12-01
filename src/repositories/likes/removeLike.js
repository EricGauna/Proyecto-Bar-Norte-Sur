const getPool = require("../../Database/getPool");

const removeLike = async (
  problemasId,
  userId
) => {
  const pool = getPool();

  await pool.query(
    "DELETE FROM likes WHERE problemasId = ? AND userId = ?",
    [problemasId, userId]
  );
};

module.exports = removeLike;
