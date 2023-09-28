/*import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function testingMongoDBConnection(){
    try{
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('🍃🎲 Connected to MongoDB');
    }catch(err){
        console.error('Connection error:', err);
        process.exit(1);
    }
}

export default testingMongoDBConnection;
*/