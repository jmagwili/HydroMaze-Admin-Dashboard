import express from "express";
import {getOrdersToday} from "../controllers/dashboard.controller.js";

const router = express.Router();


router.route('/').get(getOrdersToday);

export default router;