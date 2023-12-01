require("dotenv").config();
const bcrypt = require("bcrypt");
const getPool = require("./getPool");

// Función que inserta datos de prueba en la DB

const populateDb = async () => {
  try {
    const pool = getPool();

    console.log("Inserting users...");

    await pool.query(`
        INSERT INTO users (email, password, name, role) VALUES 
        ("pepe@email.com", "${await bcrypt.hash(
          "123456",
          10
        )}", "Pepe", "admin"),
        ("maria@email.com", "${await bcrypt.hash(
          "123456",
          10
        )}", "María", "admin"),
        ("gonzalo@email.com", "${await bcrypt.hash(
          "123456",
          10
        )}", "Gonzalo", "normal")
    `);

    console.log("Inserting comida...");

    await pool.query(`
        INSERT INTO comida (title, description, userId) VALUES 
        ("Hamburguesa XL", "La mejor hamburguesa de la zona", 1),
        ("Croquetas de Jamón", "Croquetas de jamon ibérico 100%", 2),
        ("Ensalada Mixta", "Ensalada básica", 3)
    `);

    console.log("Inserting comentarios...");

    await pool.query(`
    INSERT INTO comida_comentarios (comentario, userId, comidaId) VALUES
    ('Comentario en Plato 1', 1, 1),
    ('Comentario en Plato 2', 2, 2),
    ('Comentario en Plato 3', 3, 3)
    `);

    console.log("Inserting likes...");

    await pool.query(`
        INSERT INTO likes (comidaId, userId) VALUES 
        (1, 2),
        (1, 3),
        (2, 1)
    `);
console.log("Inserting comidasImages...");

      await pool.query(`
    INSERT INTO comida_images (image, comidaId) VALUES 
        ("croquetas-precocinadas-elegir.jpg", 2),
        ("hamburguesas-caseras-receta.jpg", 1),
        ("ensalda mixta.jpeg", 3)
    `);
    console.log("¡All done! 🚀");
  } catch (error) {
    console.error(error.message);
  } finally {
    process.exit();
  }
};

populateDb();
