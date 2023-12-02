const getPool = require("../../Database/getPool");

const resolveStatusComidas = async (id) => {
  const pool = getPool();

  await pool.query(
    "UPDATE comidas_estado SET estado = 'entregado' WHERE id = ?;",
    [id]
  );
};

module.exports = resolveStatusComidas;
