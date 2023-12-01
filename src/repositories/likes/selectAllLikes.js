const getPool = require("../../Database/getPool");

const selectAllLikes = async (
    userId
) => {
    const pool = getPool();

    const [like] = await pool.query(
        "SELECT * FROM likes WHERE userId = ?",
        [userId]
    );

    return like;
};

module.exports = selectAllLikes;
