const getPool = require("../../Database/getPool");

const SelectProblemas = async (queryParams) => {
  const pool = getPool();

  let sqlQuery =
    "SELECT p.*, COUNT(l.id) likes FROM problemas p LEFT JOIN likes l ON p.id = l.problemasId";
  let values = [];
  let clause = "WHERE";
  for (const key in queryParams) {
    const value = queryParams[key];

    sqlQuery += ` ${clause} ${key} LIKE ?`;
    values.push(`%${value}%`);

    clause = "AND";
  }

  sqlQuery += " GROUP BY p.id;";

  const [problemas] = await pool.query(
    sqlQuery,
    values
  );

  return problemas;
};

module.exports = SelectProblemas;
