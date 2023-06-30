
const BD = require('../db/db.js');
const mysql = require('mysql');

const conectBD = mysql.createConnection({
    host: BD.BD_HOST,
    user: BD.BD_USER,
    password: BD.BD_PASSWORD,
    database: BD.BD_NAME
});

const cargarComentarioById = (req,res) => {
 const idposts = req.params.idposts;
 const sql = `SELECT c.idcomentarios,
 c.contenido_comentario,
 c.fecha_publicacion_comentarios,
 c.usuario_comentario,
 IFNULL(s.idsubComentario, '') AS idsubComentario,
 IFNULL(s.contenido_subComentario, '') AS contenido_subComentario,
 IFNULL(s.fecha_subComentario, '') AS fecha_subComentario,
 IFNULL(s.usuario_subComentario, '') AS usuario_subComentario
 FROM posteos.comentarios c
 LEFT JOIN subcomentario s ON c.idcomentarios = s.idcomentariopadre 
 WHERE id_posts = ${idposts}`;

//  const sql = `SELECT * from comentarios WHERE id_posts = ${idposts}`
conectBD.query(sql,(err,result) => {
    if (err) throw(err);
    res.send(result)
 })
};
const sendComentario = (req, res) => {
    const sql = 'INSERT INTO comentarios SET ?'
    const idposts = req.params.idposts;
    const solicitudObj = {
        contenido_comentario: req.body.contenidoComentario,
        fecha_publicacion_comentarios: req.body.fechaPublicacionComentarios,
        usuario_comentario: req.body.usuarioComentario,
        id_posts: idposts
    }

    conectBD.query(sql, solicitudObj, (error, result)=>{
    if (error) throw error
    res.send("Comentario agregado con exito!!!!!")
    })
};

module.exports = {
 sendComentario,
 cargarComentarioById
};