const getPool = require("../../Database/getPool");

const selectComidasImages = async (id) => {
  const pool = getPool();

  const [comidasImages] = await pool.query(
    "SELECT * FROM comidas_images WHERE comidaId = ?",
    [id]
  );

  return comidasImages;
};

module.exports = selectComidasImages;
