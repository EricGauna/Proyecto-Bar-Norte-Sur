const insertProblemas = require("./insertProblemas");
const insertProblemasImage = require("./insertProblemasImage");
const SelectProblemas = require("./SelectProblemas");
const SelectProblemasId = require("./SelectProblemasId");
const resolveStatusProblemas = require("./resolveStatusProblemas");
const unresolveStatusProblemas = require("./unresolveStatusProblema")
const deleteProblemasDb = require("./deleteProblemasDb");
const updateProblemasId = require("./updateProblemasId")
const selectProblemasImages = require("./selectProblemasImages")
const deleteImagesProblema = require("./deleteImagesProblema");

module.exports = {
  insertProblemas,
  insertProblemasImage,
  SelectProblemas,
  SelectProblemasId,
  resolveStatusProblemas,
  unresolveStatusProblemas,
  deleteProblemasDb,
  updateProblemasId,
  selectProblemasImages,
  deleteImagesProblema
};