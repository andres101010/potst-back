const BD = require('../db/db.js');
const mysql = require('mysql');
const path = require('path');
const fs = require('fs');
const conectBD = mysql.createConnection({
    host: BD.BD_HOST,
    user: BD.BD_USER,
    password: BD.BD_PASSWORD,
    database: BD.BD_NAME
});

const cargarArchivos = (req,res) => {
    // const idposts = req.params.idposts
    // const sql = `SELECT * FROM archivos WHERE idposteo = ${idposts}`
    const sql = 'SELECT * FROM archivos '
    const directorioArchivos = path.join(__dirname, '../dbarchivos');
    if (!fs.existsSync(directorioArchivos)) {
        fs.mkdirSync(directorioArchivos);
    }
    
    conectBD.query(sql,(err, result)=>{
        if (err) throw err
        
        result.map(archivos => { 
            console.log(archivos)
            const nombreArchivo = `${archivos.idarchivos} ${archivos.nombre}` ;
            fs.writeFileSync(path.join(directorioArchivos, nombreArchivo), archivos.datos)
        })

       //const archivosdir = fs.readdirSync(path.join(__dirname, '../dbarchivos/'))
       const archivosdir = fs.readdirSync(directorioArchivos);
       res.json(archivosdir)
       console.log(archivosdir)
    })
}

module.exports ={
    cargarArchivos
};