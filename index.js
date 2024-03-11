import express from "express"
import dotenv from "dotenv"
import apiRouter from "./src/api/routes/api.routes.js";
dotenv.config()


const app = express()
const port = 10000


//api para las busquedas
app.use("/api", apiRouter )



app.listen(port,()=>{
    try {
        console.log(`SERVIDOR EJECUTANDOSE EN PUERTO ${port}`);
    } catch (error) {
        console.log(error);
    }
})

//console.log(await getFlights())
