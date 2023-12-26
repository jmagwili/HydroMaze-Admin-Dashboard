// orders.js
import express from "express";
import { getAllOrders, searchOrder } from "../controllers/orders.controller.js"; 

const router = express.Router();

//http://127.0.0.1:5173//api/v1/orders
router.route('/').get(getAllOrders);
router.route('/search').post(searchOrder)
export default router;
