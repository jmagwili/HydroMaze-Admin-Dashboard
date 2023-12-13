import express from "express";
import {getOrdersToday} from "../controllers/dashboard.controller.js";
import { getCustomersToday } from "../controllers/dashboard.controller.js";
import { getRevToday } from "../controllers/dashboard.controller.js";
import { getStatusData } from "../controllers/dashboard.controller.js";
import { getDailySales } from "../controllers/dashboard.controller.js";
import { getRecentOrders } from "../controllers/dashboard.controller.js";
const router = express.Router();

// http://localhost:port/api/v1/dashboard/
router.route('/orders-today/').get(getOrdersToday);
router.route('/customers-today/').get(getCustomersToday);
router.route('/revenue-today/').get(getRevToday);
router.route('/recent-orders/').get(getRecentOrders);
// routes for the charts
router.route('/status-data/').get(getStatusData);
router.route('/daily-sales/').get(getDailySales);



export default router;