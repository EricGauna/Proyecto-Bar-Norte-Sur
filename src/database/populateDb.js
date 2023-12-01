require("dotenv").config();
const bcrypt = require("bcrypt");
const getPool = require("./getPool");


const populateDb = async () => {
  try {
    const pool = getPool();

    console.log("Inserting users...");

    await pool.query(`
        INSERT INTO users (email, password, name, role ) VALUES 
        ("Martina@email.com", "${await bcrypt.hash(
          "123456",
          10
        )}", "Martina", "admin"),
        ("Lucas@email.com", "${await bcrypt.hash(
          "123456",
          10
        )}", "Lucas", "normal"),
        ("Jesus@email.com", "${await bcrypt.hash(
          "123456",
          10
        )}", "Chuchi", "normal")
    `);

    console.log("Inserting problemas...");

     await pool.query(`
        INSERT INTO problemas (title, description, barrio, ciudad, userId) VALUES 
        ("Reformas en la calle del Ayuntamiento", "Empezaron ayer las obras para modernizar la calle principal, segun ha informado el concistorio, duraran 4 meses. Los comercios de la zona estan muy molestos por la duracion de las mismas, dicen que venderan mucho menos por culpa de las obras.", "Lavapies", "Madrid", 1),
        ("Visita de los responsables del Ayuntamiento", "Han visitado para ver la evolucion de las obras del gran teatro los responsables de dichas obras del Ayuntamiento.", "Chueca", "Madrid", 1),
        ("Obras en calle Pascual", "Llevan ya 2 semanas de obras en calle Pascual, haciendo despliegue de fibra, y actualizando el alcantarillado, han aprovechado para mejorar los servicios que prestan en la zona a los vecinos", "Chueca", "Madrid", 1),
        ("Obras en calle Montesa", "A causa de una averia en el portal 21 de la misma calle, el ayuntamiento se ha visto obligado a levantar toda la calle para cambiar las tuberias, que eran de la epoca de la guerra civil, tuberias de plomo.", "Cortes", "Madrid", 1),
        ("Obras en calle Ancha", "Llevan ya 4 meses de obras y no tiene pinta de que vayan a terminar en un corto espacio de tiempo, todo empezó como una obra pre-campaña, y se ha alargado mas de lo que deberia a causa de diversos problemas que se han encontrado los operarios", "Lavapies", "Madrid", 1),
        ("Calle Gordiño en obras", "Empezaron hace 1 semana las obras en esta calle, para cambiar las tuberias de agua,luz y gas, y aprovechara el ayuntamiento para dar un lavado de cara a todas las aceras de la zona", "Lavapies", "Madrid", 1),
        ("Calle Pelícano cortada", "Por fin empezaron las obras en calle Pelicano, para mejorar todo el asfalto de la calle dado que tenia inumerables zocabones, y las aceras, que tenian muchismas zonas sin asfaltar y las partes que si lo estaban, estaban en muy mal estado", "Cortes", "Madrid", 1),
        ("Reformas del Ayuntamiento", "El ayuntamiento de Madrid, ha empezado las obras en calle Sagunto, para poder dar el servicio de fibra a todos los vecinos, que llevan años pidiendolo. Sus conecciones a internet eran verdaderamente nefastas", "Chueca", "Madrid", 1)
    `); 
    console.log("Inserting problemasImages...");

      await pool.query(`
    INSERT INTO problemas_images (images, problemaId) VALUES 
    ("d3e0ae7a-aa5c-4903-9327-34bbdb9d5fae.jpeg", 1),
    ("fec4a86f-6bc5-414a-8b2c-2d045a4e018c.jpeg", 1),
    ("cfeadd9f-fd09-44e1-84d7-fce4c01adf5d.jpeg", 1),
    ("e73e9a03-d946-4a2c-8c5a-b5c3da5530c7.jpeg", 1),
    ("b6c45468-86f2-4f82-a893-09efd47d241d.jpeg", 2),
    ("92393e15-61c0-468e-84da-200f6a054477.jpeg", 2),
    ("7ede33dc-842a-42fc-bd50-2d6a9168669e.jpeg", 2),
    ("f78a490a-b87e-4ecb-bb25-f08535ff5556.jpeg", 2),
    ("1644a731-4eed-4300-b15a-177e6af19009.jpeg", 3),
    ("8dc4bda7-602e-41ec-b6d3-44be28cf4db6.jpeg", 3),
    ("1c2295aa-3fdd-4ce5-afef-74f9404a30b5.jpeg", 3),
    ("3adf132e-19e7-4750-beff-1034fe6a28ec.jpeg", 3),
    ("4a7d3824-0016-4948-800e-f7ecc627be33.jpeg", 4),
    ("16c55488-24d6-4830-a752-8b4c9bed5300.jpeg", 4),
    ("7831a626-e9f5-4ebd-8bb8-6ca33e194b68.jpeg", 4),
    ("0b01543c-42ac-4fe5-8625-52a82bd7545d.jpeg", 5),
    ("6a9a5891-a1cf-45f2-bdad-1a220445430b.jpeg", 5),
    ("606d3524-d684-43bb-b7d6-60ce90c9a175.jpeg", 5),
    ("67586b25-f86f-4682-a6bf-2afae2a4eeb1.jpeg", 5),
    ("25dbcb90-3434-4568-8275-acb08833ca70.jpeg", 5),
    ("466331de-c512-4b73-8596-475d69c961d5.jpeg", 6),
    ("bd7370f6-7fd8-4bc1-98ec-b2460ba198c0.jpeg", 6),
    ("bfc17ff0-f1fe-4f24-af7b-b3ed91b6142b.jpeg", 6),
    ("6d2a6891-1e56-4787-b1b9-0edc08f37e22.jpeg", 6),
    ("34ca5334-dc85-4b88-ae98-ab4f4b309e73.jpeg", 7),
    ("90f7bba9-db93-4921-8279-f2ceda483e42.jpeg", 7),
    ("52fd44c0-7e22-4c4d-a353-a512c755120c.jpeg", 7),
    ("404f3ffd-1053-4143-a424-426f86b700b1.jpeg", 8),
    ("ee6dd97b-353e-4119-bcca-88052cf92f4c.jpeg", 8),
    ("35560c29-fd20-4d2e-8941-ed3d13f2b1fd.jpeg", 8),
    ("a4c015de-3554-41a5-b373-7c0210eed112.jpeg", 8)
    `)  

    console.log("Inserting likes...");

     await pool.query(`
        INSERT INTO likes (problemasId, userId) VALUES 
        (1, 2),
        (1, 3),
        (2, 3),
        (2, 1),
        (2, 2),
        (3, 1),
        (4, 1),
        (4, 2),
        (4, 3)

    `); 

    console.log("¡All done! 🚀");
  } catch (error) {
    console.error(error.message);
  } finally {
    process.exit();
  }
};

populateDb();
