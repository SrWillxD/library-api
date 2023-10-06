import express from 'express';
const routes = express.Router();
import salesControllerOBJ from '../Controllers/sales.controller.js';
import basicAuthMiddlewareAdmin from '../Middlewares/basicAuthMiddlewareAdmin.js';

routes.post('/registerasale', basicAuthMiddlewareAdmin, salesControllerOBJ.registerASale);
routes.get('/getsalebyid/:saleId', basicAuthMiddlewareAdmin, salesControllerOBJ.getSaleById);
routes.get('/getallsales', basicAuthMiddlewareAdmin, salesControllerOBJ.getAllSales);
routes.get('/getsalesbyclient/:clientId', basicAuthMiddlewareAdmin, salesControllerOBJ.getSalesByClient);
routes.get('/getsalesbybook/:bookId', basicAuthMiddlewareAdmin, salesControllerOBJ.getSalesByBook);
routes.get('/getsalesbyauthor/:authorId', basicAuthMiddlewareAdmin, salesControllerOBJ.getSalesByAuthor);


export default routes;
