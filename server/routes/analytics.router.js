import express from "express";
import { 
    getTotalRev, revenuePerMonth
} from "../controllers/analytics.controller.js";

const router = express.Router();
router.route('/totalrev').get(getTotalRev);
router.route('/monthlyrev').get(revenuePerMonth);

export default router;