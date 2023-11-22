const getPool = require("../../database/getPool");

const insertPost = async (post) => {
  const { title, description, userId } = post;

  const pool = getPool();

  const [{ insertId }] = await pool.query(
    "INSERT INTO posts (title, description, userId) VALUES (?, ?, ?)",
    [title, description, userId]
  );

  return insertId;
};

module.exports = insertPost;
