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


router.get('/', (req,res) => {
    res.send("Bienvenidos al login")    
});

router.post('/', (req,res) => {
    
  const {  user,password  } = req.body;
  const values = [ user, password]
  
  const sql = 'SELECT * FROM login WHERE user = ? and password = ?'
  
  conectBD.query(sql, values, (err, result)=>{
    if(err){
        res.status(500).send(err)
    }else if(result.length > 0){
        res.status(200).send("El usuario existe!")
    }else{
        res.status(400).send("El usuario no existe!")
    }
  })
});

export default router