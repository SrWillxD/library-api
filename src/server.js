import express from 'express';
const app = express();
import cors from 'cors';

const port = 3333;
app.use(cors());
app.use(express.json);



app.listen(3333, () => console.log(`⚡🚪 Backend started at http://localhost:${port}`));