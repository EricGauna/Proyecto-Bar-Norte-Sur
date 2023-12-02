const getPool = require("../../Database/getPool");

const changeStatusComidasEntregando = async (id) => {
  const pool = getPool();

  await pool.query(
    "UPDATE comidas_estado SET estado = 'entregando' WHERE id = ?;",
    [id]
  );
};

module.exports = changeStatusComidasEntregando;
