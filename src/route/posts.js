const express = require("express");
const router = express.Router();
const {cargarPosts, cargarPostsById, createPosts} = require('../controllers/controller.posts.js');
const {fileUpload} = require('../middellware/middelware.archivos.js');
express().use(express.json());


router.get('/cargar-post', cargarPosts);

router.get('/cargar-post/:idposts', cargarPostsById);

router.post('/crear-post',fileUpload.single('file'), createPosts);





module.exports = router;