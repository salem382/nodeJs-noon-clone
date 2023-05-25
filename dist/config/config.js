"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnect = () => {
    mongoose_1.default.connect('mongodb+srv://Ahmed:Salem@cluster0.iqymeb8.mongodb.net/Ecommerce-noon-clone')
        .then(() => console.log("database is connected"))
        .catch(() => console.log("error in database"));
};
exports.dbConnect = dbConnect;
