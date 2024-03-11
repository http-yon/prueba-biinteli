//importamos mongoose y su funcion schema
import mongoose, { Schema } from "mongoose";

//creamos el schema de los vuelos
const flightSchema = mongoose.Schema({

    transport: [{
        type: Schema.Types.ObjectId,
        ref: 'Transport',
        required: true
    }],

    origin: {
        type: String,
        required: true
    },

    destination: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },
});

//creamos el mdelo de vuelos con el schema antes creado
const FlightModel = mongoose.model('Flight', flightSchema, "flight");

//exportamos el modelo
export { FlightModel };
