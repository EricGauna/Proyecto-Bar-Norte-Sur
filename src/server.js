require("dotenv").config();
const cors = require("cors");
const express = require("express");
const fileUpload = require("express-fileupload");

// Requerimos los controllers de los posts
const {
  getPosts,
  createPost,
  deletePost,
  editPost,
  getPost,
} = require("./controllers/posts");

// Requerimos los controllers de los users

const {
  createUser,
  loginUser,
  activateUser,
  deleteUser,
} = require("./controllers/users");

// Requerimos los controllers de los likes

const { togglePostLike } = require("./controllers/likes");

// Requerimos los middlewares
const {
  handleError,
  handleNotFound,
  validateAuth,
  checkAdmin,
} = require("./middlewares");

const app = express();

// Nos traemos el PORT del .env
const { PORT } = process.env;

app.use(
  cors({
    origin: ["http://127.0.0.1:5500"],
  })
);

// Middleware que codifica y parsea el body para que podamos acceder a él en la propiedad req.body
app.use(express.json());
app.use(fileUpload());

// Endpoints de los posts
app.get("/posts", getPosts);
app.get("/posts/:id", getPost);
app.post("/posts", validateAuth, createPost);
app.delete("/posts/:id", validateAuth, deletePost);
app.put("/posts/:id", validateAuth, editPost);
app.post("/posts/:id/like", validateAuth, togglePostLike);

// Endpoints de los usuarios
app.post("/users", createUser);
app.post("/login", loginUser);
app.get("/activate/:registrationCode", activateUser);
// Este endpoint es solo para usuarios administradores. No lo vimos en clase, pero os dejo el ejemplo
app.delete("/users/:id", validateAuth, checkAdmin, deleteUser);

// Middlware 404. Solo las peticiones que no coincidan con ningún endpoint van a llegar aquí
app.use(handleNotFound);

// Middleware de errores. Si algún endpoint hace un next(error), la petición viene directamente a este middleware
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
