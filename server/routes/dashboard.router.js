import express from "express";
import {getOrdersToday} from "../controllers/dashboard.controller.js";
import { getCustomersToday } from "../controllers/dashboard.controller.js";
import { getRevToday } from "../controllers/dashboard.controller.js";
const router = express.Router();

//http://127.0.0.1:port/api/v1/dashboard/
router.route('/orders-today/').get(getOrdersToday);
router.route('/customers-today/').get(getCustomersToday);
router.route('/revenue-today/').get(getRevToday);


export default router;