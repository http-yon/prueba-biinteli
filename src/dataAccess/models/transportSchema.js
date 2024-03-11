//importamos mongoose
import mongoose from "mongoose";

//creamos el schema de transporte
const transportSchema = mongoose.Schema({
    flightCarrier: {
        type: String,
        required: true
    },

    flightNumber: {
        type: String,
        required: true
    }
});

//creamos el modelo de transporte con el schema antes creado
const TransportModel = mongoose.model('Transport', transportSchema, "transport");

//exportamos el modelo 
export { TransportModel };
