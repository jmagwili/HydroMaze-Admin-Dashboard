// orders.js
import express from "express";
import { 
    getAllOrders,
    searchOrder,
    confirmOrder,
    rejectOrder,
} from "../controllers/orders.controller.js"; 

const router = express.Router();

//http://127.0.0.1:5173//api/v1/orders
router.route('/').get(getAllOrders);
router.route('/search').post(searchOrder)
router.route('/confirm').post(confirmOrder)
router.route('/reject').post(rejectOrder)


export default router;
