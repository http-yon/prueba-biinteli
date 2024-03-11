//importamos la libreria "mongoose"
import mongoose from "mongoose";

//funcion para crear la conexion a la base de datos
const dbConection = async () => {
    try {
        //traemos la uri de mongo por el .env
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DB ONLINE');
    } catch (error) {
        console.log(error);
        throw new Error('DB CANT INIZIALIZING')
    }
}

//exportamos la funcion
export default dbConection