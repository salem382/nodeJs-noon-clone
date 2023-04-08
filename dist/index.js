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
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const ApiErrors_1 = require("./utls/ApiErrors");
const subCategory_routes_1 = __importDefault(require("./routes/subCategory.routes"));
const brand_routes_1 = __importDefault(require("./routes/brand.routes"));
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const app = (0, express_1.default)();
(0, config_1.dbConnect)();
app.use(express_1.default.json());
app.use('/api/v1/category', category_routes_1.default);
app.use('/api/v1/subCategory', subCategory_routes_1.default);
app.use('/api/v1/brand', brand_routes_1.default);
app.use('/api/v1/product', products_routes_1.default);
app.use('*', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return next(new ApiErrors_1.AppError('invalide url' + req.originalUrl, 404));
}));
app.use(ApiErrors_1.errorHandler);
process.on('unhandledRejection', () => {
    console.log("unhandledRejection");
});
app.listen(5000, () => console.log('server is running'));
