import express from 'express';
const app = express();
import cors from 'cors';
import testingElephantSQLConnection from './app/Database/ElephantSQL/testingElephantSQLConnection.js';
import mongoConnection from './app/Database/MongoDB/database.js';
import clientsRoute from '../src/app/Routes/clients.route.js';
import authorsRoute from '../src/app/Routes/authors.route.js';
import booksRoute from '../src/app/Routes/books.route.js';
import salesRoute from '../src/app/Routes/sales.route.js';

//! The admin username and password are hardcoded as it is mandatory guidance for the exercise proposed by the faculty.
global.adminUser = "admin";
global.adminPass = "desafio-igti-nodejs"

const port = 3333;
app.use(cors());
app.use(express.json());

testingElephantSQLConnection();
mongoConnection();

app.use('/clients', clientsRoute);
app.use('/authors', authorsRoute);
app.use('/books', booksRoute);
app.use('/sales', salesRoute);

app.listen(3333, () => console.log(`⚡🚪 Backend started at http://localhost:${port}`));
