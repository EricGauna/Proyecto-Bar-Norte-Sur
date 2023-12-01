const getPool = require("../../Database/getPool");

const selectUserByemail = async (email) => {
  const pool = getPool();

  const [[user]] = await pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  return user;
};

module.exports = selectUserByemail;
