//Importar mysql
import mysql from "mysql2"

//Creacion del objeto mysql 
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'cine'
})

connection.connect((err)=>{
    if(err){
        console.log(err)
        return
    }
    console.log("Conexion exitosa")
})

export default connection
