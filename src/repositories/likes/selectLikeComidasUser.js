const getPool = require("../../Database/getPool");

const selectLikeComidasUser = async (
  comidasId,
  userId
) => {
  const pool = getPool();

  const [[like]] = await pool.query(
    "SELECT * FROM likes WHERE comidasId = ? AND userId = ?",
    [comidasId, userId]
  );

  return like;
};

module.exports = selectLikeComidasUser;
