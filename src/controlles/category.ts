import { AppError, catchError } from "../utls/ApiErrors";
import categoryModel from "../models/category.model";
import slugify from "slugify";



class Category {
 
    async addCategory(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const {name} = req.body;
            await categoryModel.insertMany({name, slug:slugify(name)});
            return res.json({message:"success"});
        })(req, res, next);   
    }
    async updateCategory(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const{id} = req.params;
            const {name} = req.body;
            const cat = await categoryModel.findByIdAndUpdate(id, {name}, {new:true});
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

            const result = await categoryModel.find({});
            return res.json({message:"success",result});
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