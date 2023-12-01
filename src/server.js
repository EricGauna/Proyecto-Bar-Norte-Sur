require("dotenv").config();
const morgan = require("morgan")
const path = require('path');
const cors = require("cors");
const express = require("express");
const fileUpload = require("express-fileupload");

const { PORT } = process.env;

// Cotrollers
const {
  createUsers,
  loginUsers,
  DeleteUser,
} = require("./Controllers/users");

const {
  createProblemas,
  getProblemas,
  toogleStatus,
  deleteProblemas,
  editProblemas,
  getProblemasImage,
  getAllProblemas,
} = require("./Controllers/problemas");

// Middlewares

const {
  handle404,
  handleErrors,
  Admin,
} = require("./Middlewares");
const validateAuth = require("./Middlewares/validAuth");
const {
  ToggleLike, getAllLikes,
} = require("./Controllers/likes");
const { getAllImages } = require("./utils");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use('/images', express.static(path.join(__dirname, 'Uploads')));
app.use(express.json());
app.use(fileUpload());
app.use(morgan('dev'))

// Endpoints usuarios:

app.post("/registeruser", createUsers);
app.delete("/user/:id", validateAuth, Admin, DeleteUser);
app.post("/login", loginUsers);
app.get("/user/like", validateAuth, getAllLikes)

// Endpoints problemas:

app.get('/images', getAllImages)

app.post("/createproblema", validateAuth, Admin, createProblemas);
app.delete("/problemas/:id", validateAuth, Admin, deleteProblemas);
app.get("/problemas", getAllProblemas);
app.get("/search", getProblemas)
app.get("/problemas/:id", getProblemasImage);
app.post("/problemas/:id/like", validateAuth, ToggleLike);
app.put("/problemas/:id/edit", validateAuth, Admin, editProblemas)
app.put("/problemas/:id/status", validateAuth, Admin, toogleStatus);

app.use(handle404);

app.use(handleErrors);

app.listen( PORT, () => {
  console.log(
    "Server listening on port:",
    ` ${ PORT }`
  );
});
