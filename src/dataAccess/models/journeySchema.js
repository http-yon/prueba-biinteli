import mongoose, { Schema } from "mongoose";
//import { flightSchema } from "./Flight.js";

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

const JourneyModel = mongoose.model('Journey', journeySchema, "journey");

export { JourneyModel }