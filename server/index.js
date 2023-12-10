import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { databaseInit } from "./database.js";

import orderRouter from './routes/orders.router.js'
import customerRouter from './routes/customers.router.js'
import dashboardRouter from './routes/dashboard.router.js'
const app = express();
const port = 4001;

dotenv.config();
databaseInit();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//routes
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/dashboard", dashboardRouter);

app.listen(port, console.log(`App is running \nListening to port ${port}`));
