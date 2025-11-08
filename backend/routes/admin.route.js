import express from 'express';
import {protectRoute} from '../middlewares/auth.middleware.js';
import { checkAdminRole } from '../middlewares/role.middleware.js';
//controllers
import { addProduct,
        totalUsers,
        getAllProducts,
        editProduct,
        deleteProduct,
        getAllCategories,
        addCategory,
        deleteCategory,
        editCategory} from '../controllers/admin.controller.js';

const server =express.Router();

server.use(protectRoute);
server.use(checkAdminRole);

server.post('/dashboard/addProduct',addProduct);
server.get('/dashboard/totalUsers',totalUsers);
server.get('/dashboard/allProducts',getAllProducts);
server.post('/dashboard/editProduct/:id',editProduct);
server.delete('/dashboard/deleteProduct/:id',deleteProduct);
server.get('/dashboard/allCategories',getAllCategories);
server.post('/dashboard/addCategory',addCategory);
server.delete('/dashboard/deleteCategory/:id',deleteCategory);
server.put('/dashboard/editCategory/:id',editCategory);

export default server;