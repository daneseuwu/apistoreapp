import express from "express";
import { getOrders, getIdOrder, createOrder } from "../controller/order";

const orderRoutes = express.Router();

// orderRoutes.get("/", getOrders);
// orderRoutes.get("/", getIdOrder);
orderRoutes.post("/", createOrder);

export default orderRoutes;