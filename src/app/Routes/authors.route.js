import express from 'express';
const routes = express.Router();
import authorsControllerOBJ from '../Controllers/authors.controller.js'

routes.post('/registerauthor', authorsControllerOBJ.registerAuthor);
routes.put('/updateauthor/:id', authorsControllerOBJ.updateAuthor);
routes.delete('/deleteAuthor/:author_id', authorsControllerOBJ.deleteAuthor);
routes.get('/getallauthors', authorsControllerOBJ.getAllAuthors);
routes.get('/getauthorbyid/:author_id', authorsControllerOBJ.getAuthorById);

export default routes;
