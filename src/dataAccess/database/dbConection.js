import mongoose from "mongoose";

const dbConection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DB ONLINE');
    } catch (error) {
        console.log(error);
        throw new Error('DB CANT INIZIALIZING')
    }
}

export default dbConection