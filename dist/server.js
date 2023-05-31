"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var mongo_1 = __importDefault(require("./config/mongo"));
var product_1 = __importDefault(require("./routes/product"));
var order_1 = __importDefault(require("./routes/order"));
var webhook_1 = require("./webhook");
require("dotenv").config();
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/webhook", express_1.default.raw({ type: "application/json" }), webhook_1.webhookHandler);
app.use("/products", product_1.default);
app.use("/orders", order_1.default);
(0, mongo_1.default)();
var port = process.env.PORT || 9000;
app.listen(port, function () {
    try {
        console.log("Server listening on port http://localhost:".concat(port));
    }
    catch (error) {
        console.log("Failed to listen on server port:", error);
    }
});
//# sourceMappingURL=server.js.map