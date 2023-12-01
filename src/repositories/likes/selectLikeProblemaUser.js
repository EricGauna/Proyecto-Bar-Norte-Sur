const getPool = require("../../Database/getPool");

const selectLikeProblemaUser = async (
  problemasId,
  userId
) => {
  const pool = getPool();

  const [[like]] = await pool.query(
    "SELECT * FROM likes WHERE problemasId = ? AND userId = ?",
    [problemasId, userId]
  );

  return like;
};

module.exports = selectLikeProblemaUser;
