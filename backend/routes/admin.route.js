import express from 'express';
import {protectRoute} from '../middlewares/auth.middleware.js';
import { checkAdminRole } from '../middlewares/role.middleware.js';
//controllers
import { addProduct } from '../controllers/admin.controller.js';

const server =express.Router();

server.use(protectRoute);
server.use(checkAdminRole);

server.post('/dashboard/addProduct',addProduct);

export default server;