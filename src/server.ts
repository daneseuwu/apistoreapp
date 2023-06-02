import express, { Request, Response } from "express";
import cors from "cors";
import conn from "./config/mongo";
import productRoutes from "./routes/product";
import orderRoutes from "./routes/order";
import { webhookHandler } from "./webhook";
require("dotenv").config();

const app = express();
app.use(express.json());

const whiteList = ["http://localhost:5173/"];
app.use(cors({ origin: whiteList }));

app.post("/webhook", express.raw({ type: "application/json" }), webhookHandler);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.get("/", (request: Request, response: Response) => {
  response.redirect("/products");
});

conn();
const port = process.env.PORT || 9000;

app.listen(port, () => {
  try {
    console.log(`Server listening on port http://localhost:${port}`);
  } catch (error) {
    console.log(`Failed to listen on server port:`, error);
  }
});
