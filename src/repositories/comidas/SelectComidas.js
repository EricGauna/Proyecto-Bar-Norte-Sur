const getPool = require("../../Database/getPool");

const SelectComidas = async (queryParams) => {
  const pool = getPool();

  let sqlQuery =
    "SELECT p.*, COUNT(l.id) likes FROM comidas p LEFT JOIN likes l ON p.id = l.comidasId";
  let values = [];
  let clause = "WHERE";
  for (const key in queryParams) {
    const value = queryParams[key];

    sqlQuery += ` ${clause} ${key} LIKE ?`;
    values.push(`%${value}%`);

    clause = "AND";
  }

  sqlQuery += " GROUP BY p.id;";

  const [comidas] = await pool.query(
    sqlQuery,
    values
  );

  return comidas;
};

module.exports = SelectComidas;
