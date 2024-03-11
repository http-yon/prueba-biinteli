import mongoose from "mongoose";

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

const TransportModel = mongoose.model('Transport', transportSchema, "transport");

export { TransportModel };
