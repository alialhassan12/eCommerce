import express from 'express';
import {protectRoute} from '../middlewares/auth.middleware.js';
//controllers
import { getAllCategories,getProductsOfCategory } from '../controllers/category.controller.js';

const server=express.Router();

server.get('/category',protectRoute,getAllCategories);
server.get('/category/:id',protectRoute,getProductsOfCategory);

export default server;

