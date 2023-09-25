import mongoose from 'mongoose';
const { MONGO_URL } = process.env;

async function testingMongoDBConnection(){
    try{
        await mongoose.connect(MONGO_URL, {
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
