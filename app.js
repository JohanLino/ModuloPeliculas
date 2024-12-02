//Importar express
import express from "express"
//Importan la conexion de la base de datis
import connection from "./database.js"


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.listen(3002, ()=>{
    console.log("Hola")
})

app.get('/',(req, res) =>{
    res.send("Hello")
})

app.get('/api/movies/getAll', (req, res) => {
    connection.query('SELECT * FROM pelicula', function(err, result){
        if(err){
            return res.status(500).json(err)
        }
        return res.status(200).json(result)
    })
})

app.post('/api/movies/create', (req, res) => {
    // nombre, duracionMin,sinopsis, categoria, genero, poster,fechaEstreno

    // req <-- request / petición
    // res <-- response / respuesta

    // Obtuviste todas las propiedades del cuerpo de la petición
    const nombre = req.body.nombre
    const duracionMin = req.body.duracionMin
    const sinopsis = req.body.sinopsis
    const categoria = req.body.categoria
    const genero = req.body.genero
    const poster = req.body.poster
    const fechaEstreno = req.body.fechaEstreno

    // con el objeto connection utilizando la función query definimos la consulta a ejecutar; despues, verificamos sí hay un error o todo ha
    // ido bien; en base a eso, mandamos una respuesta satisfactoria o erronea
    connection.query(`INSERT INTO pelicula (nombre, duracionMin, sinopsis, categoria, genero, poster, fechaEstreno) VALUES (${nombre}, ${duracionMin}, ${sinopsis}, ${categoria}, ${genero}, ${poster}, ${fechaEstreno})`, 
        function (err, result) {
            if(err){
                console.log(err)
                return res.status(500).json({error: err})
            }
            console.log("exito")
            return res.status(200).json({message: result})
    })
})

app.post('/api/movies/modify', (req, res) => {
    // Obtuviste todas las propiedades del cuerpo de la petición
    const idPelicula = req.body.idPelicula
    const nombre = req.body.nombre
    const duracionMin = req.body.duracionMin
    const sinopsis = req.body.sinopsis
    const categoria = req.body.categoria
    const genero = req.body.genero
    const poster = req.body.poster
    const fechaEstreno = req.body.fechaEstreno

    connection.query(`UPDATE pelicula SET nombre = ${nombre}, duracionMin = ${duracionMin}, sinopsis = ${sinopsis}, categoria = ${categoria}, 
        genero = ${genero}, poster = ${poster}, fechaEstreno = ${fechaEstreno} WHERE idPelicula = ${idPelicula}`, 
        function (err, result) {
            // si hay error... retorna un json con la información del error
            if(err){
                return res.status(500).json({error: err})
            }
            // caso contrario - retorna un mensaje de success
            return res.status(200).json({message: result})
    })
})

app.get('/api/movies/delete', (req, res) => {
    const idPelicula = req.body.idPelicula
    connection.query(`UPDATE pelicula SET estatus = 0 WHERE idPelicula = ${idPelicula};`, function (err, result) {
        if(err){
            return res.status(404).json({err})
        }
        return res.status(200).json(result)
    })
})


app.get('/api/movies/search/:name', (req, res) => {
    connection.query(`SELECT * FROM pelicula WHERE nombre = '${req.params.name}'`, function (err, result) {
        if(err){
            return res.status(404).json({err})
        }
        return res.status(200).json({pelicula: result})
    })
})

