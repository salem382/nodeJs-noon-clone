import { AppError, catchError } from "../utls/ApiErrors";
import slugify from "slugify";
import productModel from "../models/product.model";


class Product {
 
    async addProduct(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

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

            // pagination ======
            let page = req.query.page * 1 || 1;
            if (req.query.page <= 0)  page = 1;
            let limit = 2;
            let skip = (page - 1) * limit;
            // filter========
            let filterObj = {...req.query};
            let excueArr= ['sort', 'fields', 'keyword', 'page'];
            excueArr.forEach((q) => {
                delete filterObj[q];
            })
            let stringifyFilterObj:string = JSON.stringify(filterObj);
            filterObj = stringifyFilterObj.replace(/\b(gt|gte|lt|lte)\bg/, match => `$${match}`)

            let mongooseQuery= productModel.find(filterObj).skip(skip).limit(limit);
            //sort===========    

            if (req.query.sort) {
                let sortedBy:string = req.query.sort.split(',').join(' ');
                mongooseQuery.sort(sortedBy) 
            }

            // search

            if (req.query.keyword) {

                mongooseQuery.find({$or:[
                    {title:{$regx:req.query.keyword, $options:'i'}},
                    {description:{$regx:req.query.keyword, $options:'i'}},
                ]})
            }
            // select 

            if (req.query.fields) {
                let sortedBy:string = req.query.fields.split(',').join(' ');
                mongooseQuery.select(sortedBy) 
            }

            const result = await mongooseQuery;
            return res.json({message:"success",result});
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