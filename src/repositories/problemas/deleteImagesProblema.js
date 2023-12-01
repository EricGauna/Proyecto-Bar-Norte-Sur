const getPool = require("../../Database/getPool");

const deleteImagesProblema = async (
    problemasId
) => {
    const pool = getPool();

    await pool.query(
        "DELETE FROM problemas_images WHERE problemaId = ?;",
        [problemasId]
    );
}

module.exports = deleteImagesProblema