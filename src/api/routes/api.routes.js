//importacion de express
import express from "express";
//importacon del controlador
import { searchData } from "../controllers/api.controllers.js";

//constante para usar el router de express
const apiRouter = express.Router()

//creamos la ruta para usar el controlador
//se padan los parametros origin (origen del viaje) y destination (destino del viaje)
apiRouter.get("/search/:origin/:destination", searchData)

//exportamos la ruta
export default apiRouter