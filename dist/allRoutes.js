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
exports.init = void 0;
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const ApiErrors_1 = require("./utls/ApiErrors");
const subCategory_routes_1 = __importDefault(require("./routes/subCategory.routes"));
const brand_routes_1 = __importDefault(require("./routes/brand.routes"));
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const review_routes_1 = __importDefault(require("./routes/review.routes"));
const wishlist_routes_1 = __importDefault(require("./routes/wishlist.routes"));
const address_routes_1 = __importDefault(require("./routes/address.routes"));
const coupon_routes_1 = __importDefault(require("./routes/coupon.routes"));
const cart_routes_1 = __importDefault(require("./routes/cart.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
function init(app) {
    app.use('/api/v1/category', category_routes_1.default);
    app.use('/api/v1/subCategory', subCategory_routes_1.default);
    app.use('/api/v1/brand', brand_routes_1.default);
    app.use('/api/v1/product', products_routes_1.default);
    app.use('/api/v1/user', user_routes_1.default);
    app.use('/api/v1/auth', auth_routes_1.default);
    app.use('/api/v1/review', review_routes_1.default);
    app.use('/api/v1/wishlist', wishlist_routes_1.default);
    app.use('/api/v1/address', address_routes_1.default);
    app.use('/api/v1/coupon', coupon_routes_1.default);
    app.use('/api/v1/cart', cart_routes_1.default);
    app.use('/api/v1/order', order_routes_1.default);
    app.use('*', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        return next(new ApiErrors_1.AppError('invalide url' + req.originalUrl, 404));
    }));
    app.use(ApiErrors_1.errorHandler);
    process.on('unhandledRejection', () => {
        console.log("unhandledRejection");
    });
}
exports.init = init;
