const getPool = require("../../Database/getPool");

const changeStatusComidasPreprando = async (id) => {
  const pool = getPool();

  await pool.query(
    "UPDATE comidas_estado SET estado = 'preparando' WHERE id = ?;",
    [id]
  );
};

module.exports = changeStatusComidasPreprando;
