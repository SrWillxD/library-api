import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function testingMongoDBConnection(){
    try{
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('🍃🎲 Connected to MongoDB');
    } catch (error) {
        console.error('Connection error:', error);
        process.exit(1);
    }
}

export default testingMongoDBConnection;
