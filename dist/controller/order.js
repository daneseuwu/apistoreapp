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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdOrder = exports.getOrders = exports.createOrder = void 0;
var order_1 = __importDefault(require("../model/order"));
var stripe_1 = __importDefault(require("stripe"));
var stripeClient = new stripe_1.default(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2022-11-15",
});
var BASE_UNIT = 100;
var getTotalAmount = function (orderItems) {
    return (orderItems.reduce(function (acc, item) { return acc + item.price * item.quantity; }, 0) *
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
var createOrder = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, user, orderItems, deliveryAddress, totalPrice, totalAmount, paymentIntent, order, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = request.body, user = _a.user, orderItems = _a.orderItems, deliveryAddress = _a.deliveryAddress, totalPrice = _a.totalPrice;
                totalAmount = getTotalAmount(orderItems);
                return [4 /*yield*/, stripeClient.paymentIntents.create({
                        amount: totalAmount,
                        currency: "inr",
                    })];
            case 1:
                paymentIntent = _b.sent();
                return [4 /*yield*/, order_1.default.create({
                        user: user,
                        orderItems: orderItems,
                        deliveryAddress: deliveryAddress,
                        totalPrice: totalPrice,
                        paymentIntentId: paymentIntent.id,
                        paymentStatus: "pending",
                        paymentDetails: {},
                    })];
            case 2:
                order = _b.sent();
                return [2 /*return*/, response.status(200).json({
                        status: 200,
                        data: order,
                        clientSecret: paymentIntent.client_secret,
                        message: "Orden creado con exito",
                    })];
            case 3:
                error_1 = _b.sent();
                console.log(error_1);
                return [2 /*return*/, response.status(500).json({
                        status: 500,
                        message: "Error al crear ordern",
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createOrder = createOrder;
var getOrders = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, order_1.default.find({})];
            case 1:
                orders = _a.sent();
                return [2 /*return*/, response.status(200).json({
                        status: 200,
                        data: orders,
                        message: "Listado de ordenes con exito",
                    })];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                return [2 /*return*/, response.status(200).json({
                        status: 200,
                        message: "Error al crear order",
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOrders = getOrders;
var getIdOrder = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, order, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = request.params.id;
                return [4 /*yield*/, order_1.default.findById(id)];
            case 1:
                order = _a.sent();
                return [2 /*return*/, response.status(200).json({
                        status: 200,
                        data: order,
                        message: "Listado de orden con exito",
                    })];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                return [2 /*return*/, response.status(500).json({
                        status: 500,
                        message: "Upps parece que ha ocurrido un error al obtener la orden",
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getIdOrder = getIdOrder;
//# sourceMappingURL=order.js.map