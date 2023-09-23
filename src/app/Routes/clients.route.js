import express from 'express';
const routes = express.Router();
import clientsControllerOBJ from '../Controllers/clients.controller.js'

routes.post('/registerclient', clientsControllerOBJ.registerClient);
routes.put('/updateclient/:id', clientsControllerOBJ.updateClient);
routes.delete('/deleteclient/:client_id', clientsControllerOBJ.deleteClient);

export default routes;