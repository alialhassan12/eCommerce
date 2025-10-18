import express from 'express';
import {protectRoute} from '../middlewares/auth.middleware.js';
//controllers
import { getAllCategories,getProductsOfCategory,getProduct } from '../controllers/category.controller.js';

const server=express.Router();

server.get('/category',protectRoute,getAllCategories);
server.get('/category/:id',protectRoute,getProductsOfCategory);
server.get('/category/:id/:prodId',protectRoute,getProduct);

export default server;

