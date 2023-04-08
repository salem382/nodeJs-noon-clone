import  express  from "express";
import { dbConnect } from "./config/config";
import categoryRouter from "./routes/category.routes";
import { errorHandler, AppError } from "./utls/ApiErrors";
import SubcategoryRouter from "./routes/subCategory.routes";
import brandRouter from "./routes/brand.routes";
import productRouter from "./routes/products.routes";

const app = express();

dbConnect();

app.use(express.json());

app.use('/api/v1/category',categoryRouter);
app.use('/api/v1/subCategory',SubcategoryRouter)
app.use('/api/v1/brand',brandRouter)
app.use('/api/v1/product',productRouter)



app.use('*', async (req, res, next) => {

    return next(new AppError('invalide url' + req.originalUrl, 404));
})

app.use(errorHandler);


process.on('unhandledRejection', () => {
    console.log ("unhandledRejection");
})

app.listen(5000, () => console.log ('server is running'));