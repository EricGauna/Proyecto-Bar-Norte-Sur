const getPool = require("../../Database/getPool");

const changeStatusComidasListo = async (id) => {
  const pool = getPool();

  await pool.query(
    "UPDATE comidas_estado SET estado = 'listo' WHERE id = ?;",
    [id]
  );
};

module.exports = changeStatusComidasListo;
