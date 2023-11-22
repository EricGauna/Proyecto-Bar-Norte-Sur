const getPool = require("../../database/getPool");

const selectPostImages = async (postId) => {
  const pool = getPool();

  const [postImages] = await pool.query(
    "SELECT * FROM post_images WHERE postId = ?",
    [postId]
  );

  return postImages;
};

module.exports = selectPostImages;
