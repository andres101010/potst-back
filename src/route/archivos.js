// const express = require ('express');
// const mysql = require('mysql');
// const multer = require('multer');
// const path = require('path');
// const BD = require('../db/db.js');
// const router = express.Router();
// const fs = require('fs');


// const conectBD = mysql.createConnection({
//     host: BD.BD_HOST,
//     user: BD.BD_USER ,
//     password: BD.BD_PASSWORD,
//     database: BD.BD_NAME
// });

// const diskTorage = multer.diskStorage({
//     destination: path.join(__dirname, '../archivos'),
//     filename: (req, file, cb)=>{
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// });

// const fileUpload = multer({
//     storage: diskTorage
// })

// router.get('/', (req, res) => {
//     res.send("Welcome");
// })

// router.post('/cargar-archivos',fileUpload.single('file'), (req, res) => {
//     console.log(req.file)

//     const sql = 'INSERT INTO archivos SET ?'
//     const type = req.file.mimetype
//     const name = req.file.originalname
//     const data = fs.readFileSync(path.join(__dirname, '../archivos/' + req.file.filename))

//     conectBD.query(sql,[{nombre: name, tipo: type, datos: data}], (err, result)=>{
        
//         if(err) throw(err)
//         res.send("GUARDADO CON EXITO!")
//     })
// })

// module.exports = router