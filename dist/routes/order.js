"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_1 = require("../controller/order");
const orderRoutes = express_1.default.Router();
// orderRoutes.get("/", getOrders);
// orderRoutes.get("/", getIdOrder);
orderRoutes.post("/", order_1.createOrder);
exports.default = orderRoutes;
//# sourceMappingURL=order.js.map