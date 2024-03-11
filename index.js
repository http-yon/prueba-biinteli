//importacion de librerias y la ruta de la api
import express from "express"
import dotenv from "dotenv"
import apiRouter from "./src/api/routes/api.routes.js";

//habilitar dlecturas de dotenv
dotenv.config()

//constante para usar express
const app = express()

//puerto de localhost 
const port = 10000

//api para las busquedas
app.use("/api", apiRouter )


//activamos el servidor local
app.listen(port,()=>{
    try {
        console.log(`SERVIDOR EJECUTANDOSE EN PUERTO ${port}`);
    } catch (error) {
        console.log(error);
    }
})
