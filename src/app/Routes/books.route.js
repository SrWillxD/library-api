import express from 'express';
const routes = express.Router();
import booksControllerOBJ from '../Controllers/books.controller.js';

routes.post('/registerbook', booksControllerOBJ.registerBook);

export default routes;
