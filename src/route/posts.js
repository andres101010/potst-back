import express from "express";
import mysql from "mysql";
import { BD_HOST,BD_NAME,BD_PASSWORD,BD_PORT,BD_USER } from "../db/db.js";
import { Router } from "express";
express().use(express.json());
const router = Router();

const conectBD = mysql.createConnection({
    host: BD_HOST,
    user: BD_USER,
    password: BD_PASSWORD,
    database: BD_NAME
})



router.get('/', (req, res)=>{
    res.send("Bienvenido a posts")
});

router.post('/crear-post', (req, res)=>{
   const sql = "INSERT INTO posts SET ?"

   const solicitudObj = {
    titulo: req.body.titulo,
    contenido: req.body.contenido,
    fecha_publicacion: req.body.fecha_publicacion,
    usuario_posts: req.body.usuario_posts
  }
conectBD.query(sql,solicitudObj,(err, result)=>{
    if(err) throw err;
    res.send("Posts enviado!!!!!")
})
});

router.get('/cargar-post', (req, res)=>{
    const sql = 'SELECT * FROM posts'
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

export default router;