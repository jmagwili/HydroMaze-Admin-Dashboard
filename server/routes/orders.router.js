// orders.js
import express from "express";
import { getAllOrders } from "../controllers/orders.controller.js"; // Corrected import path
import mongoose from 'mongoose';
const router = express.Router();

router.route('/').get(getAllOrders);

export default router;
