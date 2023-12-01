const getPool = require("../../Database/getPool");

const deleteImagesComidas = async (
    comidasId
) => {
    const pool = getPool();

    await pool.query(
        "DELETE FROM comidas_images WHERE comidasId = ?;",
        [comidasId]
    );
}

module.exports = deleteImagesComidas