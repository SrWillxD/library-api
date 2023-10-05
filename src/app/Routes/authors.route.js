import express from 'express';
const routes = express.Router();
import authorsControllerOBJ from '../Controllers/authors.controller.js';
import basicAuthMiddlewareAdmin from '../Middlewares/basicAuthMiddlewareAdmin.js';

routes.post('/registerauthor', basicAuthMiddlewareAdmin, authorsControllerOBJ.registerAuthor);
routes.put('/updateauthor/:id', basicAuthMiddlewareAdmin, authorsControllerOBJ.updateAuthor);
routes.delete('/deleteAuthor/:author_id', basicAuthMiddlewareAdmin, authorsControllerOBJ.deleteAuthor);
routes.get('/getallauthors', basicAuthMiddlewareAdmin, authorsControllerOBJ.getAllAuthors);
routes.get('/getauthorbyid/:author_id', basicAuthMiddlewareAdmin, authorsControllerOBJ.getAuthorById);

export default routes;
