import { AppError, catchError } from "../utls/ApiErrors";
import categoryModel from "../models/category.model";
import slugify from "slugify";
import ApiFeatures from "../utls/ApiFeatures";


class Category {
 
    async addCategory(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            req.body.slug = slugify(req.body.name);
            let result = new categoryModel(req.body)
            await result.save();
            return res.json({message:"success"});
        })(req, res, next);   
    }
    async updateCategory(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const{id} = req.params;
            req.body.slug = slugify(req.body.name);
            const cat = await categoryModel.findByIdAndUpdate(id,req.body , {new:true});
            if (!cat) return next(new AppError('category not found', 404));
            return res.json({message:"success"});
        })(req, res, next);   
    }
    
    async deleteCategory(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const {id} = req.params;
            const cat = await categoryModel.findByIdAndDelete(id, {new:true});
            if (!cat) return next(new AppError('category not found', 404));
            return res.json({message:"success"});
        })(req, res, next);   
    }
    async getAllCategory(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {


            let length = (await categoryModel.find()).length;
        
            let apiFeatures = new ApiFeatures(categoryModel.find(), req.query)
            .pagination().search().sort().select().filter();
            let result = await apiFeatures.mongooseQuery;

            return res.json({message:"success",currentPage : apiFeatures.page, pagesLength:Math.ceil(length / apiFeatures.pagesLength),result});
        })(req, res, next);   
    }
    async getCategory(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const {id} = req.params;
            const result = await categoryModel.findById(id);
            if (!result) return next(new AppError('category not found', 404));
            return res.json({message:"success", result});
        })(req, res, next);   
    }
}

const category:Category = new Category();

export default category;