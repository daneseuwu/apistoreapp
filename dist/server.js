"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongo_1 = __importDefault(require("./config/mongo"));
const product_1 = __importDefault(require("./routes/product"));
const order_1 = __importDefault(require("./routes/order"));
const webhook_1 = require("./webhook");
require("dotenv").config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/webhook", express_1.default.raw({ type: "application/json" }), webhook_1.webhookHandler);
app.use("/products", product_1.default);
app.use("/orders", order_1.default);
(0, mongo_1.default)();
const port = process.env.PORT || 9000;
app.listen(port, () => {
    try {
        console.log(`Server listening on port http://localhost:${port}`);
    }
    catch (error) {
        console.log(`Failed to listen on server port:`, error);
    }
});
//# sourceMappingURL=server.js.map