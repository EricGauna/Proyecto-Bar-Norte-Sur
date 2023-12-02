require("dotenv").config();
const getPool = require("./getPool");

// Función que crea desde cero todas las tablas de la DB

const initDb = async () => {
  try {
    const pool = getPool();

    await pool.query("CREATE DATABASE IF NOT EXISTS bar_norte_sur;");

    console.log("Deleting tables...");

    await pool.query("DROP TABLE IF EXISTS likes;");
    await pool.query("DROP TABLE IF EXISTS comidas_images;");
    await pool.query("DROP TABLE IF EXISTS comidas_comentarios;");
    await pool.query("DROP TABLE IF EXISTS pedidos_modificaciones;");
    await pool.query("DROP TABLE IF EXISTS pedidos;");
    await pool.query("DROP TABLE IF EXISTS comidas;");
    await pool.query("DROP TABLE IF EXISTS users;");

    console.log("Creating users table...");

    await pool.query(`
        CREATE TABLE users (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            name VARCHAR(50) NOT NULL,
            avatar VARCHAR(100),
            registrationCode VARCHAR(100),
            role ENUM("admin", "normal") DEFAULT "normal"
        );
    `);

    console.log("Creating comidas table...");

    await pool.query(`
        CREATE TABLE comidas (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(200) NOT NULL,
            description VARCHAR(5000) NOT NULL,
            usersId INT UNSIGNED NOT NULL,
            FOREIGN KEY (usersId) REFERENCES users (id) ON DELETE CASCADE
        );
    `);

    console.log("Creating comidas_images table...");

    await pool.query(`
        CREATE TABLE comidas_images (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
            image VARCHAR(100) NOT NULL,
            comidasId INT UNSIGNED NOT NULL,
            FOREIGN KEY (comidasId) REFERENCES comidas (id) ON DELETE CASCADE
        );
    `);

    console.log("Creating comidas_comentarios table...");

    await pool.query(`
        CREATE TABLE comidas_comentarios (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          comentario VARCHAR(5000),
          usersId INT UNSIGNED NOT NULL,
          comidasId INT UNSIGNED NOT NULL,
          FOREIGN KEY (usersId) REFERENCES users (id) ON DELETE CASCADE,
          FOREIGN KEY (comidasId) REFERENCES comidas (id) ON DELETE CASCADE
        );
    `);

    console.log("Creating pedidos table...");

    await pool.query(`
        CREATE TABLE pedidos (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            comidasId INT UNSIGNED NOT NULL,
            estado ENUM('preparando', 'entregando', 'entregado') DEFAULT 'preparando',
            FOREIGN KEY (comidasId) REFERENCES comidas (id) ON DELETE CASCADE
        );
    `);
    
    console.log("Creating pedidos_modificaciones table...");
    
    await pool.query(`
        CREATE TABLE pedidos_modificaciones (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            comentario VARCHAR(5000),
            usersId INT UNSIGNED NOT NULL,
            pedidosId INT UNSIGNED NOT NULL,
            FOREIGN KEY (usersId) REFERENCES users (id) ON DELETE CASCADE,
            FOREIGN KEY (pedidosId) REFERENCES pedidos (id) ON DELETE CASCADE
        );
    `);
    
    console.log("Creating likes table...");

    await pool.query(`
        CREATE TABLE likes (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          usersId INT UNSIGNED NOT NULL,
          comidasId INT UNSIGNED NOT NULL,
          FOREIGN KEY (usersId) REFERENCES users (id) ON DELETE CASCADE,
          FOREIGN KEY (comidasId) REFERENCES comidas (id) ON DELETE CASCADE
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
