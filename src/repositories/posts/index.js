const insertPost = require("./insertPost");
const selectPosts = require("./selectPosts");
const selectPostById = require("./selectPostById");
const deletePostById = require("./deletePostById");
const updatePostById = require("./updatePostById");
const insertPostImage = require("./insertPostImage");
const selectPostImages = require("./selectPostImages");

module.exports = {
  insertPost,
  selectPosts,
  selectPostById,
  deletePostById,
  updatePostById,
  insertPostImage,
  selectPostImages,
};
