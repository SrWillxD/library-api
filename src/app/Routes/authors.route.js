import express from 'express';
const routes = express.Router();
import authorsControllerOBJ from '../Controllers/authors.controller.js'

routes.post('/registerauthor', authorsControllerOBJ.registerAuthor);

export default routes;