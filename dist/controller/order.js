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
exports.getIdOrder = exports.getOrders = exports.createOrder = void 0;
const order_1 = __importDefault(require("../model/order"));
const stripe_1 = __importDefault(require("stripe"));
const stripeClient = new stripe_1.default(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2022-11-15",
});
const BASE_UNIT = 100;
const getTotalAmount = (orderItems) => {
    return (orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0) *
        BASE_UNIT);
};
/**
 *
 * @param request
 * @param response
 * @returns
 * 1. To make a request to stripe , it's gonna return paymentIntent, we currency and order amount
 * 2. Save paymentIntentId in order model.
 * 3. Return paymentIntentId.client_secret
 */
const createOrder = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, orderItems, deliveryAddress, totalPrice } = request.body;
        const totalAmount = getTotalAmount(orderItems);
        const paymentIntent = yield stripeClient.paymentIntents.create({
            amount: totalAmount,
            currency: "inr",
        });
        const order = yield order_1.default.create({
            user,
            orderItems,
            deliveryAddress,
            totalPrice,
            paymentIntentId: paymentIntent.id,
            paymentStatus: "pending",
            paymentDetails: {},
        });
        return response.status(200).json({
            status: 200,
            data: order,
            clientSecret: paymentIntent.client_secret,
            message: "Orden creado con exito",
        });
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            status: 500,
            message: "Error al crear ordern",
        });
    }
});
exports.createOrder = createOrder;
const getOrders = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_1.default.find({});
        return response.status(200).json({
            status: 200,
            data: orders,
            message: "Listado de ordenes con exito",
        });
    }
    catch (error) {
        console.log(error);
        return response.status(200).json({
            status: 200,
            message: "Error al crear order",
        });
    }
});
exports.getOrders = getOrders;
const getIdOrder = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const order = yield order_1.default.findById(id);
        return response.status(200).json({
            status: 200,
            data: order,
            message: "Listado de orden con exito",
        });
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            status: 500,
            message: "Upps parece que ha ocurrido un error al obtener la orden",
        });
    }
});
exports.getIdOrder = getIdOrder;
//# sourceMappingURL=order.js.map