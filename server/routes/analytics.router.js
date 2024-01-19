import express from "express";
import { 
    getTotalRev, revenuePerMonth, containerTypeRevenue, getDailySales
} from "../controllers/analytics.controller.js";

const router = express.Router();
router.route('/totalrev').get(getTotalRev);
router.route('/monthlyrev').get(revenuePerMonth);
router.route('/container-type-rev').get(containerTypeRevenue);
router.route('/daily-sales-total').get(getDailySales);


export default router;