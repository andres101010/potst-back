const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const BD = require("../db/db.js");
express().use(express.json());


const conectBD = mysql.createConnection({
    host: BD.BD_HOST,
    user: BD.BD_USER,
    password: BD.BD_PASSWORD,
    database: BD.BD_NAME
});


router.get('/', (req,res) => {
    const sql = 'SELECT idlogin FROM login'
    conectBD.query(sql, (err,result) => {
        if (err) throw err
        idlogin = result;
        res.json({
            mensaje: idlogin
        })  
})
});
router.post('/', (req,res) => {
  
  const {  user,password  } = req.body;
  const values = [ user, password]
  
  const sql = 'SELECT * FROM login WHERE user = ? and password = ?'
  
  
  conectBD.query(sql, values, (err, result)=>{
    if(err){
        res.status(500).send(err)
    }else if(result.length > 0){
        //res.status(200).send("El usuario existe!")
        const idloginSession = result[0].idlogin;
        req.session.idlogin = idloginSession;
        console.log(idloginSession);
       res.json({
        mensaje: "Usuario existe!"
       })
    }else{
        res.status(400).send("El usuario no existe!")
    }
    
  })
});


  
router.post('/create-user', (req, res)=>{
    /*********** */
    const sql = 'INSERT INTO LOGIN SET ?'
    /*********** */
    const solicitudObj = {
        user: req.body.user,
        password: req.body.password
    }
    /********* */

    conectBD.query(sql, solicitudObj,(err, result)=>{
        if(err) throw err
        res.send("Agregado con exito!!")

    })
    /*************************** */
});

module.exports = router;