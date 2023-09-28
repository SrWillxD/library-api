import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

function mongoConnection(){
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'libraryDB',
    });

    const db = mongoose.connection;
    db.on("error", (error)=>console.error(error));
    db.once("open", ()=>console.log("🍃🎲 Conected to the database!"));
}

export default mongoConnection;
