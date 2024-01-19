import express from "express";
import { 
    getTotalRev, revenuePerMonth, containerTypeRevenue, getTotalSales
} from "../controllers/analytics.controller.js";

const router = express.Router();

router.route('/totalrev').get(getTotalRev);
router.route('/monthly-rev').get(revenuePerMonth);
router.route('/container-type-rev').get(containerTypeRevenue);
router.route('/total-sales').get(getTotalSales);


export default router;