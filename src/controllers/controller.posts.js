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
    const sql = `SELECT * FROM posts WHERE idposts = '${idposts}'`
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