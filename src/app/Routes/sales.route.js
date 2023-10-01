import express from 'express';
const routes = express.Router();
import salesControllerOBJ from '../Controllers/sales.controller.js';

routes.post('/registerasale', salesControllerOBJ.registerASale);

export default routes;
