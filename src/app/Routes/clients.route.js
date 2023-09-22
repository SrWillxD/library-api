import express from 'express';
const routes = express.Router();
import clientsControllerOBJ from '../Controllers/clients.controller.js'

routes.post('/registerclient', clientsControllerOBJ.registerClient);
routes.put('/updateclient/:id', clientsControllerOBJ.updateClient);

export default routes;