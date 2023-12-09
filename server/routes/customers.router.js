import express from "express";
import { getAllCustomers } from "../controllers/customers.controller.js";

const router = express.Router();

//http://127.0.0.1:5173//api/v1/customers/
router.route('/').get(getAllCustomers);

export default router;
