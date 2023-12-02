const getPool = require("../../Database/getPool");

const insertComidasImage = async (
  images,
  problemasId
) => {
  const pool = getPool();

  const [{ insertId }] = await pool.query(
    "INSERT INTO comidas_images (images, comidaId) VALUES (?, ?);",
    [images, comidasId]
  );

  return insertId;
};

module.exports = insertComidasImage;
