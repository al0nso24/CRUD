const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "alonso_24122005_",
    database: "empleados"
})

//Agregar un nuevo empleado:
app.post("/nuevoEmpleado", (req, res)=>{
    const {nombre, edad, pais, cargo, sueldo} = req.body;
    db.query("INSERT INTO emp(nombre, edad, pais, cargo, sueldo) VALUES(?,?,?,?,?)",
        [nombre, edad, pais, cargo, sueldo], (err, result)=>{
        if(err){
            console.log("error");
        }else{
            res.send(result);
        }
    })
})

//Lista de empleados:
app.get("/listarEmpleados", (req, res)=>{
    db.query("SELECT id, nombre, edad, pais, cargo, sueldo, (sueldo * 0.18) AS igv FROM emp", 
        (err, result)=>{
            if(err){
                console.log("error");
            }else{
                res.send(result);
            }
        }
    )
})

//Borrar empleado:
app.delete("/borrarEmpleado/:id", (req, res)=>{
    const id = req.params.id;
    db.query("DELETE FROM emp WHERE id=?", [id], (err, result)=>{
        if(err){
            console.log("error");
        }else{
            res.send(result);
        }
    })
})

//Actualizar información del empleado:
app.put("/actualizar/:id", (req, res)=>{
    const id = req.params.id;
    const {nombre, edad, pais, cargo, sueldo} = req.body;
    db.query("UPDATE emp SET nombre=?, edad=?, pais=?, cargo=?, sueldo=? WHERE id=?", 
        [nombre, edad, pais, cargo, sueldo, id], (err, result)=>{
            if(err){
                console.log("error");
            }else{
                res.send(result);
            }
        }
    )
})

//Buscar al empleado en base a su id:
app.get("/busquedaxid/:idempleado", (req, res)=>{
    const idempleado = req.params.idempleado;
    db.query("CALL sp_buscarempleado(?)", [idempleado], (err, result)=>{
        if(err){
            console.log("Error.");
        }else{
            res.send(result[0]);  //Con "[0]" porque es un procedimiento.
        }
    })
})


//Este es mi puerto:
app.listen(3001, ()=>{
    console.log("Puerto activado.")
})