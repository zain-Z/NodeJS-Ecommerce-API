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

// QYdiH8pTOSS8H6Ya

// mongodb+srv://overzainking:QYdiH8pTOSS8H6Ya@nodejs-ecommerce-api.gzhyaea.mongodb.net/?retryWrites=true&w=majority&appName=nodejs-ecommerce-api