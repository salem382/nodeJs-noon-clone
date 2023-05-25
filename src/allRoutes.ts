import categoryRouter from "./routes/category.routes";
import { errorHandler, AppError } from "./utls/ApiErrors";
import SubcategoryRouter from "./routes/subCategory.routes";
import brandRouter from "./routes/brand.routes";
import productRouter from "./routes/products.routes";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import reviewRouter from "./routes/review.routes";
import wishlistRouter from "./routes/wishlist.routes";
import addressesRouter from "./routes/address.routes";
import couponRouter from "./routes/coupon.routes";
import cartRouter from "./routes/cart.routes";
import orderRouter from "./routes/order.routes";



export function init (app:any) {
    app.use('/api/v1/category',categoryRouter);
    app.use('/api/v1/subCategory',SubcategoryRouter)
    app.use('/api/v1/brand',brandRouter)
    app.use('/api/v1/product',productRouter)
    app.use('/api/v1/user',userRouter)
    app.use('/api/v1/auth',authRouter)
    app.use('/api/v1/review',reviewRouter)
    app.use('/api/v1/wishlist',wishlistRouter)
    app.use('/api/v1/address',addressesRouter)
    app.use('/api/v1/coupon',couponRouter)
    app.use('/api/v1/cart',cartRouter)
    app.use('/api/v1/order',orderRouter)
    app.use('*', async (req:any, res:any, next:any) => {

        return next(new AppError('invalide url' + req.originalUrl, 404));
    })
    
    app.use(errorHandler);
    process.on('unhandledRejection', () => {
        console.log ("unhandledRejection");
    })
}