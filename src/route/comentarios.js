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
});



router.post('/crear-comentario', (req, res)=>{
     const sql = 'INSERT INTO comentarios SET ?'
     const solicitudObj = {
        contenido: req.body.contenido,
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

export default router