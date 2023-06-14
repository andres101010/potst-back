const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const BD = require("../db/db.js");
express().use(express.json());


const conectBD = mysql.createConnection({
    host: BD.BD_HOST,
    user: BD.BD_USER,
    password: BD.BD_PASSWORD,
    database: BD.BD_NAME
})



router.get('/', (req, res)=>{
    res.send("bienvenido a posts")
    userId = req.session.userId
    console.log(userId, "de posts")
});

router.post('/crear-post', (req, res)=>{
   const sql = "INSERT INTO posts SET ?"

   const solicitudObj = {
    titulo: req.body.titulo,
    contenido_posts: req.body.contenido,
    fecha_publicacion: req.body.fecha_publicacion,
    usuario_posts: req.body.usuario_posts
  }
conectBD.query(sql,solicitudObj,(err, result)=>{
    if(err) throw err;
    res.send("Posts enviado!!!!!")
})
});

router.get('/cargar-post', (req, res)=>{
    // const sql = 'SELECT * FROM posts LEFT JOIN comentarios ON posts.idposts = comentarios.idposts';
    const sql = 'SELECT * FROM posteos.posts '
    conectBD.query(sql, (err, result)=>{
        if(err){
            res.status(500).send(err)
        }else if(result.length > 0){
            res.status(200).send(result)
        }else{
            res.status(400).send("No hay posteos!!!")
        }
    })
});

router.get('/cargar-post/:idposts', (req, res) => {
    const idposts = req.params.idposts;
    const sql = `SELECT * FROM posteos.posts 
    LEFT JOIN  posteos.comentarios  ON posts.idposts = comentarios.id_posts
    LEFT JOIN posteos.archivos on comentarios.id_posts = archivos.id_comentarios WHERE idposts = '${idposts}'`;
    conectBD.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results)
    }) 
})


module.exports = router;