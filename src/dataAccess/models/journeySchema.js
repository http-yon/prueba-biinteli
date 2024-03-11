//importamos mongoose y su funcion schema
import mongoose, { Schema } from "mongoose";

//creamos el schema de viajes
const journeySchema = mongoose.Schema({
    origin: {
        type: String,
        required: true
    },

    destination:{
        type:String,
        required: true
    },

    price: {
        type:Number,
        required:true
    },

    flights:[{ 
        type: Schema.Types.ObjectId, 
        ref: 'Flight',
        required: true
    }],
        
})

//creamos el modelo de viajes con es schema antes creado
const JourneyModel = mongoose.model('Journey', journeySchema, "journey");

//exportamos el modelo
export { JourneyModel }