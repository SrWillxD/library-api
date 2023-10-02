import express from 'express';
const routes = express.Router();
import salesControllerOBJ from '../Controllers/sales.controller.js';

routes.post('/registerasale', salesControllerOBJ.registerASale);
routes.get('/getsalebyid/:saleId', salesControllerOBJ.getSaleById);
routes.get('/getallsales', salesControllerOBJ.getAllSales);
routes.get('/getsalesbyclient/:clientId', salesControllerOBJ.getSalesByClient);


export default routes;
