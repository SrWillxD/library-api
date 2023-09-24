import express from 'express';
const routes = express.Router();
import booksControllerOBJ from '../Controllers/books.controller.js';

routes.post('/registerbook', booksControllerOBJ.registerBook);
routes.put('/updatebook/:book_id', booksControllerOBJ.updateBook);

export default routes;
