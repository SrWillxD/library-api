import express from 'express';
const routes = express.Router();
import clientsControllerOBJ from '../Controllers/clients.controller.js'

routes.post('/registeraclient', clientsControllerOBJ.registerClient)

export default routes;