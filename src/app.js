const express = require("express");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001; // VARIABLE DE ENTORNO  PARA EL PUERTO.

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use(session({
  secret: 'secreto', // Cambia esto a una clave secreta fuerte en producción
  resave: false,
  saveUninitialized: true
}));

const login = require("./route/login.js");
const posts = require("./route/posts.js");
const comentarios = require("./route/comentarios.js");

app.use('/login', login);
app.use('/posts', posts);
app.use('/comentarios', comentarios);

app.listen(PORT);
console.log("Puerto corriendo en" , PORT)

module.exports = app;