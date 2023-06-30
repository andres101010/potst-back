const BD = require('../db/db.js');
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

const conectBD = mysql.createConnection({
    host: BD.BD_HOST,
    user: BD.BD_USER,
    password: BD.BD_PASSWORD,
    database: BD.BD_NAME
})

const cargarPosts = (req,res) => {
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
};

const cargarPostsById = (req,res) => {
    
    const idposts = req.params.idposts;


    // const sql = `SELECT  p.idposts, p.titulo, p.contenido_posts, p.fecha_publicacion, p.user_posts,
    // IFNULL(c.idcomentarios, '') AS idcomentarios,
    // IFNULL(c.contenido_comentario, '') AS contenido_comentario,
    // IFNULL(c.fecha_publicacion_comentarios, '') AS fecha_publicacion_comentarios,
    // IFNULL(c.usuario_comentario, '') AS usuario_comentario,
    // IFNULL(s.idsubComentario, '') AS idsubcomentario,
    // IFNULL(s.contenido_subComentario, '') AS contenido_subComentario,
    // IFNULL(s.fecha_subComentario, '') AS fecha_subComentario,
    // IFNULL(s.usuario_subComentario, '') AS usuario_subComentario,
    // IFNULL(a.idarchivos, '') AS idarchivos,
    // IFNULL(a.nombre, '') AS nombre,
    // IFNULL(a.datos, '') AS datos
    // FROM posteos.posts p
    // LEFT JOIN comentarios c ON c.id_posts = p.idposts 
    // LEFT JOIN subcomentario s ON s.idcomentariopadre = c.idcomentarios 
    // LEFT JOIN archivos a ON a.idposteo = p.idposts
    // WHERE p.idposts = ${idposts}
    // `
    const sql = `
SELECT
    p.idposts,
    p.titulo,
    p.contenido_posts,
    p.fecha_publicacion,
    p.user_posts,
    (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'idcomentarios', c.idcomentarios,
                'contenido_comentario', c.contenido_comentario,
                'fecha_publicacion_comentarios', c.fecha_publicacion_comentarios,
                'usuario_comentario', c.usuario_comentario,
                'subcomentarios', (
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'idsubComentario', s.idsubComentario,
                            'contenido_subComentario', s.contenido_subComentario,
                            'fecha_subComentario', s.fecha_subComentario,
                            'usuario_subComentario', s.usuario_subComentario
                        )
                    )
                    FROM subcomentario s
                    WHERE s.idcomentariopadre = c.idcomentarios
                )
            )
        )
        FROM comentarios c
        WHERE c.id_posts = p.idposts
    ) AS comentarios,
    (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'idarchivos', a.idarchivos,
                'nombre', a.nombre,
                'datos', a.datos
            )
        )
        FROM archivos a
        WHERE a.idposteo = p.idposts
    ) AS archivos
FROM
    posteos.posts p
WHERE
    p.idposts = ${idposts}
`;
    conectBD.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results)
    }) 

};

const createPosts = (req, res) => {
    const sql = "INSERT INTO posts SET ?"
    const solicitudObj = {
    titulo: req.body.titulo,
    contenido_posts: req.body.contenido,
    fecha_publicacion: req.body.fecha,
    user_posts: req.body.userPosts
  };
  conectBD.query(sql, solicitudObj, (err, results) => {
    if (err) {
        res.send(err);
    }
    console.log(results);
    const idposteo = results.insertId;
    const sqlArchivo = 'INSERT INTO archivos SET ?'
    const type = req.file.mimetype
    const name = req.file.originalname
    const data = fs.readFileSync(path.join(__dirname, '../archivos/' + req.file.filename))

    conectBD.query(sqlArchivo,[{nombre: name, tipo: type, datos: data, idposteo: idposteo}], (err, result) => {
       if (err) {
        res.send(err);
       }
       res.send("Guardado con exito!!!")
    })
  })
};


 module.exports = {
    cargarPosts,
    cargarPostsById,
    createPosts
 };