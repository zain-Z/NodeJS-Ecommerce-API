import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbConnect = async () => {
    try{
        const connected = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected: ${await connected.connection.host}`)
    }
    catch (error){
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default dbConnect;