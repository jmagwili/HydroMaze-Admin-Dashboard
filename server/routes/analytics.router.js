import express from "express";
import { 
    getTotalRev
} from "../controllers/analytics.controller.js";

const router = express.Router();
router.route('/totalrev').get(getTotalRev);

export default router;