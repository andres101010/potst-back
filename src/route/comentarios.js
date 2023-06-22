const express = require("express");
const router = express.Router();
const { sendComentario, cargarComentarioById } = require("../controllers/controller.comentarios.js");
express().use(express.json());

router.get('/cargar/:idposts', cargarComentarioById);

router.post('/:idposts', sendComentario);



module.exports = router;