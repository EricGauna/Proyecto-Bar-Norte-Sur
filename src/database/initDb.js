require("dotenv").config();
const getPool = require("./getPool");

// Función que crea desde cero todas las tablas de la DB

const initDb = async () => {
  try {
    const pool = getPool();

    console.log("Deleting tables...");

    await pool.query("DROP TABLE IF EXISTS likes;");
    await pool.query("DROP TABLE IF EXISTS post_images;");
    await pool.query("DROP TABLE IF EXISTS posts;");
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

    console.log("Creating posts table...");

    await pool.query(`
        CREATE TABLE posts (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(200) NOT NULL,
            description VARCHAR(5000) NOT NULL,
            userId INT UNSIGNED NOT NULL,
            FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
        );
    `);

    console.log("Creating post_images table...");

    await pool.query(`
        CREATE TABLE post_images (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
            image VARCHAR(100) NOT NULL,
            postId INT UNSIGNED NOT NULL,
            FOREIGN KEY (postId) REFERENCES posts (id) ON DELETE CASCADE
        );
    `);

    console.log("Creating likes table...");

    await pool.query(`
        CREATE TABLE likes (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          userId INT UNSIGNED NOT NULL,
          postId INT UNSIGNED NOT NULL,
          FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE,
          FOREIGN KEY (postId) REFERENCES posts (id) ON DELETE CASCADE
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
