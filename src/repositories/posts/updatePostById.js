const getPool = require("../../database/getPool");

const updatePostById = async (post) => {
  // Recogemos el it, title y description del objeto con los datos del post actualizados
  const { id, title, description } = post;

  const pool = getPool();

  // ACtualizamos en la DB los datos del post
  await pool.query("UPDATE posts SET title = ?, description = ? WHERE id = ?", [
    title,
    description,
    id,
  ]);
};

module.exports = updatePostById;
