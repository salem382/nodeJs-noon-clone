"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const ApiErrors_1 = require("./utls/ApiErrors");
const app = (0, express_1.default)();
(0, config_1.dbConnect)();
app.use(express_1.default.json());
app.use('/category', category_routes_1.default);
// app.use('*', async (req, res, next) => {
//     return next(new AppError('invalide url' + req.originalUrl, 404));
// })
app.use(ApiErrors_1.errorHandler);
process.on('unhandledRejection', () => {
    console.log("unhandledRejection");
});
app.listen(3000, () => console.log('server is running'));
