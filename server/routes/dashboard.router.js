import express from "express";
import {getOrdersToday} from "../controllers/dashboard.controller.js";
import { getCustomersToday } from "../controllers/dashboard.controller.js";
import { getRevToday } from "../controllers/dashboard.controller.js";
import { getStatusData } from "../controllers/dashboard.controller.js";
const router = express.Router();

//http://localhost:port/api/v1/dashboard/
router.route('/orders-today/').get(getOrdersToday);
router.route('/customers-today/').get(getCustomersToday);
router.route('/revenue-today/').get(getRevToday);
router.route('/status-data/').get(getStatusData);


export default router;