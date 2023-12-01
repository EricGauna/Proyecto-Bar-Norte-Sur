const getPool = require("../../Database/getPool");

const insertProblemas = async (problema) => {
  const { title, description , barrio, ciudad, userId } = problema;

  const pool = getPool();

  const [{ insertId }] = await pool.query(
    "INSERT INTO problemas (title, description, barrio, ciudad, userId ) VALUES (?, ?, ?, ?, ?)",
    [title, description, barrio, ciudad, userId ]
  );

  return insertId;
};

module.exports = insertProblemas;
