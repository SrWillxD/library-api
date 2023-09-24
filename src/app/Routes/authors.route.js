import express from 'express';
const routes = express.Router();
import authorsControllerOBJ from '../Controllers/authors.controller.js'

routes.post('/registerauthor', authorsControllerOBJ.registerAuthor);
routes.put('/updateauthor/:id', authorsControllerOBJ.updateAuthor);

export default routes;
