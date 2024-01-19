import express from "express";
import { 
    getTotalRev, revenuePerMonth, containerTypeRevenue
} from "../controllers/analytics.controller.js";

const router = express.Router();
router.route('/totalrev').get(getTotalRev);
router.route('/monthlyrev').get(revenuePerMonth);
router.route('/container-type-rev').get(containerTypeRevenue);

export default router;