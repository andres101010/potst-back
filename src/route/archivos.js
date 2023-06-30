const express = require ('express');
const { cargarArchivos } = require('../controllers/controller.archivos.js');
const router = express.Router();


router.get('/', cargarArchivos)




module.exports = router