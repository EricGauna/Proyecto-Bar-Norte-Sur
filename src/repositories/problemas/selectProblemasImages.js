const getPool = require("../../Database/getPool");

const selectProblemasImages = async (id) => {
  const pool = getPool();

  const [problemasImages] = await pool.query(
    "SELECT * FROM problemas_images WHERE problemaId = ?",
    [id]
  );

  return problemasImages;
};

module.exports = selectProblemasImages;
