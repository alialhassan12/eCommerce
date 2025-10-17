import express from 'express';
import {protectRoute} from '../middlewares/auth.middleware.js';
//controllers
import { addProduct } from '../controllers/admin.controller.js';

const server =express.Router();

server.use(protectRoute);

server.post('/addProduct',addProduct);

export default server;