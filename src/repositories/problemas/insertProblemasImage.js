const getPool = require("../../Database/getPool");

const insertProblemasImage = async (
  images,
  problemasId
) => {
  const pool = getPool();

  const [{ insertId }] = await pool.query(
    "INSERT INTO problemas_images (images, problemaId) VALUES (?, ?);",
    [images, problemasId]
  );

  return insertId;
};

module.exports = insertProblemasImage;
