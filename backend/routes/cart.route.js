import express from 'express';
//controllers
import{addToCart, getUserCart} from '../controllers/cart.controller.js';

const server =express.Router();

server.post('/addToCart',addToCart);
server.get('/getUserCart/:userId',getUserCart);

export default server;