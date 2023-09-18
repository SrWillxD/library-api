import express from 'express';
const app = express();
import cors from 'cors';
import testingElephantSQLConnection from './app/Database/ElephantSQL/testingElephantSQLConnection.js';

const port = 3333;
app.use(cors());
app.use(express.json);

testingElephantSQLConnection();

//!Executar um app.use para definir o apontamento das rotas

app.listen(3333, () => console.log(`⚡🚪 Backend started at http://localhost:${port}`));
