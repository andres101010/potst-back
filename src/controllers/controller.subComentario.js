const BD = require('../db/db.js');
const mysql = require('mysql');


const conectBD = mysql.createConnection({
    host: BD.BD_HOST,
    user: BD.BD_USER,
    password: BD.BD_PASSWORD,
    database: BD.BD_NAME
});

const cargarSubComentariosById = (req,res) => {
    const idcomentarios = req.params.idcomentarios;
    const sql = `SELECT * FROM subcomentario WHERE idcomentariopadre = ${idcomentarios}`;
    conectBD.query(sql, (err, result) => {
        if (err) throw err
        res.send(result)
    })
}

const sendSubComentario = (req, res) => {
    const idcomentarios = req.params.idcomentarios;
    const sql = `INSERT INTO subcomentario SET ?`
    const objSubComentario = {
         contenido_subComentario: req.body.contenidoSubComentario,
         fecha_subComentario: req.body.fechaSubComentario,
         usuario_subComentario:req.body.usuarioSubComentario,
         idcomentariopadre: idcomentarios }

    conectBD.query(sql, objSubComentario,  (err, result) => {
        if (err){
            throw err
        }else{
            res.send("Respuesta agregada con exito!!!")
            console.log(objSubComentario)
        }
    })
};
 module.exports ={
    sendSubComentario,
    cargarSubComentariosById
 }