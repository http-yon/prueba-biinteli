import mongoose, { Schema } from "mongoose";

const flightSchema = mongoose.Schema({

    transport:[{ 
        type: Schema.Types.ObjectId, 
        ref: 'Transport',
        required: true
    }],    

    origin: {
        type:String,
        required:true
    },

    destination:{
        type:String,
        required: true
    },

    price: {
        type:Number,
        required:true
    },
});

const FlightModel = mongoose.model('Flight', flightSchema, "flight");

export {FlightModel};
