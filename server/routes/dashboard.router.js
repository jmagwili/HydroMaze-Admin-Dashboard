import express from "express";
import {getOrdersToday} from "../controllers/dashboard.controller.js";
import { getCustomersToday } from "../controllers/dashboard.controller.js";

const router = express.Router();

//http://127.0.0.1:5173//api/v1/dashboard/
router.route('/orders-today/').get(getOrdersToday);
router.route('/customers-today/').get(getCustomersToday);


export default router;