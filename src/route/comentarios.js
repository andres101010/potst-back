const express = require("express");
const mysql =  require("mysql");
const router = express.Router();
const BD = require("../db/db.js");
express().use(express.json());


const conectBD = mysql.createConnection({
    host: BD.BD_HOST,
    user: BD.BD_USER,
    password: BD.BD_PASSWORD,
    database: BD.BD_NAME
});



router.post('/:postId/comentarios', (req, res)=>{
     const sql = 'INSERT INTO comentarios SET ?'
     const postId = req.params.postId;
     const solicitudObj = {
        post_id: postId,
        contenido_comentario: req.body.contenido,
        fecha_publicacion: req.body.fecha_publicacion,
        usuario_comentario: req.body.usuario_comentario
     }

     conectBD.query(sql, solicitudObj, (error, result)=>{
     if (error) throw error
     res.send("Comentario agregado con exito!!!!!")
     })
});

router.get('/cargar-comentarios', (req, res)=>{
    const sql = 'SELECT * FROM comentarios'


    conectBD.query(sql, (error, result)=>{
    if(error){
        res.status(500).res.send(error)
    }else if(result.length > 0){
        res.status(200).send(result)
    }else{
        res.status(500).send("No hay datos disponibles")
    }
    })
});

module.exports = router;