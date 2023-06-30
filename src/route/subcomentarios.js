const express = require('express');
const { sendSubComentario, cargarSubComentariosById } = require('../controllers/controller.subComentario');
const { Router } = express;

const router = Router();


router.get('/:idcomentarios', cargarSubComentariosById)

router.post('/:idcomentarios', sendSubComentario);

module.exports = router;