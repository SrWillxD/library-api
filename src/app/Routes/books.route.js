import express from 'express';
const routes = express.Router();
import booksControllerOBJ from '../Controllers/books.controller.js';
import basicAuthMiddlewareAdmin from '../Middlewares/basicAuthMiddlewareAdmin.js';

routes.post('/registerbook', basicAuthMiddlewareAdmin, booksControllerOBJ.registerBook);
routes.put('/updatebook/:book_id', basicAuthMiddlewareAdmin, booksControllerOBJ.updateBook);
routes.delete('/deletebook/:book_id', basicAuthMiddlewareAdmin, booksControllerOBJ.deleteBook);
routes.get('/getBookbyid/:bookId', basicAuthMiddlewareAdmin, booksControllerOBJ.getBookById);
routes.get('/getallbooks', booksControllerOBJ.getAllBooks);
routes.get('/getbooksbyauthor/:authorId', booksControllerOBJ.getBooksByAuthor);
routes.post('/addbookinfo', basicAuthMiddlewareAdmin, booksControllerOBJ.registerBookInfo);
routes.put('/updatebookinfo', basicAuthMiddlewareAdmin, booksControllerOBJ.updateBookInfo);
routes.delete('/deletebookinfo/:bookId', basicAuthMiddlewareAdmin, booksControllerOBJ.deleteBookInfo);
routes.post('/addreview', booksControllerOBJ.addReview);
routes.delete('/deletereview/:bookId/:position', basicAuthMiddlewareAdmin, booksControllerOBJ.deleteReview);

export default routes;
