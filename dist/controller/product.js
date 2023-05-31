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
exports.getIdProduct = exports.getProduct = exports.createProduct = void 0;
const product_1 = __importDefault(require("../model/product"));
const createProduct = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, image } = request.body;
        const product = yield product_1.default.create({
            name,
            description,
            price,
            image,
        });
        return response.status(200).json({
            status: 200,
            data: product,
            message: "Producto creado con exito",
        });
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            status: 500,
            message: "Upps parace que ha ocurrido un error al crear producto",
            error,
        });
    }
});
exports.createProduct = createProduct;
const getProduct = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.find({});
        return response.status(200).json({
            status: 200,
            data: products,
            message: "Listado de producto con exito",
        });
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            status: 500,
            message: "Upps paeace que ha ocurrido un error al obtener listado de productos",
        });
    }
});
exports.getProduct = getProduct;
const getIdProduct = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const product = yield product_1.default.findById(id);
        return response.status(200).json({
            status: 200,
            data: product,
            message: "Listado de producto con exito",
        });
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            status: 500,
            message: "Upps parece que ha ocurrido un error al obtener el producto",
        });
    }
});
exports.getIdProduct = getIdProduct;
//# sourceMappingURL=product.js.map