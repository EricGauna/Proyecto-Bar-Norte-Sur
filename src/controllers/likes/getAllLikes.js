const { selectAllLikes } = require("../../Repositories/likes");

const getAllLikes = async (req, res, next) => {
    try {
        
        const loggedUserId = req.auth.id;

        const like = await selectAllLikes(
            loggedUserId
        );

        res
            .send({ status: "ok", data:  like  });
    } catch (error) {
        next(error);
    }
};

module.exports = getAllLikes;
