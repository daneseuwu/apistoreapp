import express from "express";
import { createProduct, getIdProduct, getProduct } from "../controller/product";

const productRoutes = express.Router();

productRoutes.get("/", getProduct);
productRoutes.get("/:id", getIdProduct);
productRoutes.post("/", createProduct);

export default productRoutes;
