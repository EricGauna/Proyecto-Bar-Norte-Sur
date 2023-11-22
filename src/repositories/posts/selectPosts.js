const getPool = require("../../database/getPool");

const selectPosts = async (queryParams) => {
  const pool = getPool();

  // Definimos la consulta de sql inicial, a la que le iremos sumando los filtros que envía el cliente en los query params
  let sqlQuery =
    "SELECT p.*, COUNT(l.id) likes FROM posts p LEFT JOIN likes l ON p.id = l.postId";
  // Definimos el array de valores que van a sustituir los interrogantes que haya en la consulta de sql
  let values = [];
  // Definimos la cláusula que se va a usar cuando se añada un filtro nuevo (lo iniciamos con WHERE, pero luego lo cambiaremos)
  let clause = "WHERE";

  // Bucle que recorre cada propiedad del objeto queryParams (es decir, recorre cada filtro que envía el cliente)
  for (const key in queryParams) {
    // Value es el valor de la propiedad que estamos recorriendo en cada vuelta. Por ejemplo, si key es "title", value puede ser "ibiza"
    const value = queryParams[key];

    // Le sumamos el filtro a la consulta de sql (por ejemplo: "WHERE title LIKE ?")
    sqlQuery += ` ${clause} ${key} LIKE ?`;
    // Incluimos en el array de values el valor que va a sustituir al interrogante (por ejemplo: "%ibiza%")
    values.push(`%${value}%`);

    // Cambiamos la cláusula de WHERE a AND, ya que solo queremos que sea WHERE la primera vez, pero luego AND. Por ejemplo, si el cliente envía dos filtros como { title: "ibiza", description: "fiesta" }, en la primera vuelta del bucle queremos sumarle a la consulta WHERE title LIKE "%ibiza%", pero en la segunda vuelta, queremos añadir AND description LIKE "%fiesta%"
    clause = "AND";
  }

  // Una vez añadidos los filtros, le sumamos el GROUP BY. Lo ponemos al final, ya que el WHERE tiene que ir antes que el GROUP BY
  sqlQuery += " GROUP BY p.id;";

  // Le pasamos a pool.query la consulta de sql que hemos ido creando y el array de valores que sustituyen los interrogantes
  const [posts] = await pool.query(sqlQuery, values);

  return posts;
};

module.exports = selectPosts;
