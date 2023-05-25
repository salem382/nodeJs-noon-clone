import { AppError, catchError } from "../utls/ApiErrors";
import slugify from "slugify";
import productModel from "../models/product.model";
import ApiFeatures from "../utls/ApiFeatures";

class Product {
 
    async addProduct(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            req.body.imgCover = req.files.imgCover[0].filename;
            req.body.images = req.files.imgs.map((obj: { filename: any; }) => obj.filename);
            req.body.slug = slugify(req.body.title)
            let result = new productModel(req.body);
            await result.save();
            return res.json({message:"success"});
        })(req, res, next);   
    }
    async updateProduct(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const{id} = req.params;
            if (req.body.title) req.body.slug = slugify(req.body.title);
            const Product = await productModel.findByIdAndUpdate(id, req.body, {new:true});
            if (!Product) return next(new AppError('Product not found', 404));
            return res.json({message:"success"});
        })(req, res, next);   
    }
    async deleteProduct(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const {id} = req.params;
            const Product = await productModel.findByIdAndDelete(id, {new:true});
            if (!Product) return next(new AppError('Product not found', 404));
            return res.json({message:"success"});
        })(req, res, next);   
    }
    async getAllProducts(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            let length = (await productModel.find()).length;
            let apiFeatures = new ApiFeatures(productModel.find(), req.query)
            .pagination().search().sort().select().filter();
            const result = await apiFeatures.mongooseQuery;
            return res.json({message:"success",currentPage : apiFeatures.page, pagesLength:Math.ceil(length / apiFeatures.pagesLength),result});
        })(req, res, next);   
    }
    async getProduct(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const {id} = req.params;
            const result = await productModel.findById(id);
            if (!result) return next(new AppError('Product not found', 404));
            return res.json({message:"success", result});
        })(req, res, next);   
    }
}

const product:Product = new Product();

export default product;