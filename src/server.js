import express from 'express';
const app = express();
import cors from 'cors';
import testingElephantSQLConnection from './app/Database/ElephantSQL/testingElephantSQLConnection.js';
import clientsRoute from '../src/app/Routes/clients.route.js'

const port = 3333;
app.use(cors());
app.use(express.json());

testingElephantSQLConnection();

app.use('/clients', clientsRoute);

app.listen(3333, () => console.log(`⚡🚪 Backend started at http://localhost:${port}`));
