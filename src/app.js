const express = require("express");
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001; // VARIABLE DE ENTORNO  PARA EL PUERTO.
app.use(cors());
app.use(session({
  secret: 'secretoid', 
  resave: false,
  saveUninitialized: true
}));



const login = require("./route/login.js");
const posts = require("./route/posts.js");
const comentarios = require("./route/comentarios.js");
const subComentarios = require("../src/route/subcomentarios.js");
const archivos = require("../src/route/archivos.js");

app.use('/login', login);
app.use('/posts', posts);
app.use('/comentarios', comentarios);
app.use('/archivos', archivos);
app.use('/subComentarios', subComentarios);
app.use(express.static(path.join(__dirname, 'dbarchivos')));

app.listen(PORT);
console.log("Puerto corriendo en" , PORT)

module.exports = app;