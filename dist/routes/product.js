"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var product_1 = require("../controller/product");
var productRoutes = express_1.default.Router();
productRoutes.get("/", product_1.getProduct);
productRoutes.get("/:id", product_1.getIdProduct);
productRoutes.post("/", product_1.createProduct);
exports.default = productRoutes;
//# sourceMappingURL=product.js.map