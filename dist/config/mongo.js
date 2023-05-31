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
const { connect } = require("mongoose");
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set("strictQuery", true);
const conn = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connect(process.env.URI, {
            UseNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Successfully connected mongo database");
    }
    catch (error) {
        console.log("Error connecting to mongo database", error);
    }
});
exports.default = conn;
//# sourceMappingURL=mongo.js.map