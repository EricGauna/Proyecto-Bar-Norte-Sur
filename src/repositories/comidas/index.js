const insertProblemas = require("./insertComidas");
const insertProblemasImage = require("./insertComidasImage");
const SelectProblemas = require("./SelectComidas");
const SelectProblemasId = require("./SelectComidasId");
const resolveStatusProblemas = require("./changeStatusComidasEntregado");
const unresolveStatusProblemas = require("./unresolveStatusComida")
const deleteProblemasDb = require("./deleteComidasDb");
const updateProblemasId = require("./updateComidasId")
const selectProblemasImages = require("./selectComidasImages")
const deleteImagesProblema = require("./deleteImagesComida");

module.exports = {
  insertProblemas,
  insertProblemasImage,
  SelectProblemas,
  SelectProblemasId,
  resolveStatusProblemas,
  unresolveStatusProblemas,
  deleteComidasDb,
  updateProblemasId,
  selectProblemasImages,
  deleteImagesComidas
};