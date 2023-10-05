import express from 'express';
const routes = express.Router();
import clientsControllerOBJ from '../Controllers/clients.controller.js'
import basicAuthMiddlewareAdmin from '../Middlewares/basicAuthMiddlewareAdmin.js';

routes.post('/registerclient', basicAuthMiddlewareAdmin, clientsControllerOBJ.registerClient);
routes.put('/updateclient/:id', basicAuthMiddlewareAdmin, clientsControllerOBJ.updateClient);
routes.delete('/deleteclient/:client_id', basicAuthMiddlewareAdmin, clientsControllerOBJ.deleteClient);
routes.get('/getallclients', basicAuthMiddlewareAdmin, clientsControllerOBJ.getAllClients);
routes.get('/getclientbyid/:client_id', basicAuthMiddlewareAdmin, clientsControllerOBJ.getClientById);

export default routes;
