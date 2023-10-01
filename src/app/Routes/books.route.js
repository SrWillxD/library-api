import express from 'express';
const routes = express.Router();
import booksControllerOBJ from '../Controllers/books.controller.js';

routes.post('/registerbook', booksControllerOBJ.registerBook);
routes.put('/updatebook/:book_id', booksControllerOBJ.updateBook);
routes.delete('/deletebook/:book_id', booksControllerOBJ.deleteBook);
routes.get('/getBookbyid/:bookId', booksControllerOBJ.getBookById);
routes.get('/getallbooks', booksControllerOBJ.getAllBooks);
routes.get('/getbooksbyauthor/:authorId', booksControllerOBJ.getBooksByAuthor);

export default routes;
