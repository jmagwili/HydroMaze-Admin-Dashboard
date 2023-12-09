// orders.js
import express from "express";
import { getAllOrders } from "../controllers/orders.controller.js"; 

const router = express.Router();

router.route('/').get(getAllOrders);

export default router;
