const getPool = require("../../Database/getPool");

const updateComidasId = async (comida) => {
  const {
    title,
    description,
    id
  } = problema;

  const pool = getPool();

  await pool.query(
    "UPDATE problemas SET title = ?, description = ?, WHERE id = ?",
    [title, description, barrio, ciudad, id]
  );
};

module.exports = updateComidasId;
