const getPool = require("../../Database/getPool");

const updateProblemasId = async (problema) => {
  const {
    title,
    description,
    barrio,
    ciudad,
    id
  } = problema;

  const pool = getPool();

  await pool.query(
    "UPDATE problemas SET title = ?, description = ?, barrio = ?, ciudad = ? WHERE id = ?",
    [title, description, barrio, ciudad, id]
  );
};

module.exports = updateProblemasId;
