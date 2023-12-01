require("dotenv").config();
const getPool = require("./getPool");

// Función que crea desde cero todas las tablas de la DB

const initDb = async () => {
  try {
    const pool = getPool();

    await pool.query(
      "CREATE DATABASE IF NOT EXISTS Ciudad_accesible;"
    )

    console.log("Deleting tables...");

    await pool.query(
      "DROP TABLE IF EXISTS likes;"
    );
    await pool.query(
      "DROP TABLE IF EXISTS problemas_images;"
    );
    await pool.query(
      "DROP TABLE IF EXISTS problemas;"
    );
    await pool.query(
      "DROP TABLE IF EXISTS users;"
    );

    console.log("Creating users table...");

    await pool.query(`
   CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    name VARCHAR(50) NOT NULL,
    role ENUM('admin', 'normal') DEFAULT 'normal'

);
    `);

    console.log("Creating problemas table...");

    await pool.query(`
      CREATE TABLE problemas (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(5000) NOT NULL,
    barrio VARCHAR(200),
    ciudad VARCHAR(200),
    userId INT UNSIGNED NOT NULL,
    estado BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (userId) REFERENCES users(id)
  
);
    `);

    console.log(
      "Creating problemas_images table..."
    );

    await pool.query(`
     CREATE TABLE problemas_images (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    images VARCHAR(100) NOT NULL,
    problemaId INT UNSIGNED NOT NULL,
    FOREIGN KEY (problemaId) REFERENCES problemas (id) ON DELETE CASCADE
);
    `);

    console.log("Creating likes table...");

    await pool.query(`
  CREATE TABLE likes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    userId INT UNSIGNED NOT NULL,
    problemasId INT UNSIGNED NOT NULL,
    FOREIGN KEY (userId)
        REFERENCES users (id)
        ON DELETE CASCADE,
    FOREIGN KEY (problemasId)
        REFERENCES problemas (id)
        ON DELETE CASCADE
);
    `);

    console.log("¡All done! 🚀");
  } catch (error) {
    console.error(error.message);
  } finally {
    process.exit();
  }
};

initDb();
