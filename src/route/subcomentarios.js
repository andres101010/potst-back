const express = require('express');
const { sendSubComentario } = require('../controllers/controller.subComentario');
const { Router } = express;

const router = Router();



router.post('/:idcomentarios', sendSubComentario);

module.exports = router;