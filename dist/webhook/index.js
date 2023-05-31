"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookHandler = void 0;
const stripe_1 = __importDefault(require("stripe"));
const order_1 = __importDefault(require("../model/order"));
require("dotenv").config();
const STRIPE_KEY = process.env.STRIPE_SECRET_KEY || "";
const WEBHOOK_KEY = process.env.STRIPE_WEBHOOK_SECRET || "";
const stripeClient = new stripe_1.default(STRIPE_KEY, {
    apiVersion: "2022-11-15",
});
const webhookHandler = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sig = request.headers["stripe_signature"];
        const event = stripeClient.webhooks.constructEvent(request.body, sig, WEBHOOK_KEY);
        if (event.type === "payment_intent.created") {
            const charge = event.data.object;
            const order = yield order_1.default.findOne({
                paymentDetails: charge.payment_intent,
            });
            if (order) {
                order.paymentStatus = "paid";
                order.paymentDetails = charge;
                yield order.save();
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.webhookHandler = webhookHandler;
//# sourceMappingURL=index.js.map