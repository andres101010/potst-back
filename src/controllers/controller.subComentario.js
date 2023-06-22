const BD = require('../db/db.js');
const mysql = require('mysql');


const conectBD = mysql.createConnection({
    host: BD.BD_HOST,
    user: BD.BD_USER,
    password: BD.BD_PASSWORD,
    database: BD.BD_NAME
});

const sendSubComentario = (req, res) => {
    const idcomentarios = req.params.idcomentarios;
    const sql = `INSERT INTO subcomentarios `
    const obj = { contenido_subComentario: req.body.contenidoSubComentario,
                  fecha_subComentario: req.body.fechaSubComentario,
                  usuario_subComentario:req.body.usuarioSubComentario,
                  idcomentariopadre: idcomentarios};
    conectBD.query(sql, obj,  (err, res) => {
        if (err){
            res.send(err);
            res.send("Respuesta mandada con exito!!!")
        }
    })
};
 module.exports ={
    sendSubComentario
 }