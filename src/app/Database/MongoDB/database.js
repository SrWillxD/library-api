import mongoose from 'mongoose';
const { MONGO_URL } = process.env;

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open',()=>{
    console.log('Connected to MongoDB');
});

module.exports = mongoose;
