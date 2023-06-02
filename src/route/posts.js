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
    res.send("Bienvenido a posts")
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
    const sql = 'SELECT * FROM posts ';
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

module.exports = router;