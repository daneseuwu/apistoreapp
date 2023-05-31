import express from "express";
import cors from "cors";
import conn from "./config/mongo";
import productRoutes from "./routes/product";
import orderRoutes from "./routes/order";
import { webhookHandler } from "./webhook";
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/webhook", express.raw({ type: "application/json" }), webhookHandler);

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

conn();
const port = process.env.PORT || 9000;

app.listen(port, () => {
  try {
    console.log(`Server listening on port http://localhost:${port}`);
  } catch (error) {
    console.log(`Failed to listen on server port:`, error);
  }
});
