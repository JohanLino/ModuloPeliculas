//Importar express
import express from "express"
import connection from "./database.js"


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.listen(3002, ()=>{
    console.log()
})

app.get('/',(req, res) =>{
    res.send("Hello")
})