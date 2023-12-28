import express from "express";
import { 
    getAllCustomers,
    getCustomerRecentOrders,
    getSingleCustomer 
} from "../controllers/customers.controller.js";

const router = express.Router();

//http://127.0.0.1:5173//api/v1/customers/
router.route('/').get(getAllCustomers);
router.route('/:username').get(getSingleCustomer)
router.route('/recent-orders/:username').get(getCustomerRecentOrders)

export default router;
