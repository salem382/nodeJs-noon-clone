import { AppError, catchError } from "../utls/ApiErrors";
import slugify from "slugify";
import subCategoryModel from "../models/subCategory.model";

class SubCategory {
 
    async addSubCategory(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const {name, categoryId} = req.body;
            let result = new subCategoryModel({name, slug:slugify(name),categoryId});
            await result.save();
            return res.json({message:"success"});
        })(req, res, next);   
    }
    async updateSubCategory(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const{id} = req.params;
            const {name, categoryId} = req.body;
            const cat = await subCategoryModel.findByIdAndUpdate(id, {name, slug:slugify(name), categoryId}, {new:true});
            if (!cat) return next(new AppError('sub category not found', 404));
            return res.json({message:"success"});
        })(req, res, next);   
    }
    async deleteSubCategory(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const {id} = req.params;
            const cat = await subCategoryModel.findByIdAndDelete(id, {new:true});
            if (!cat) return next(new AppError('category not found', 404));
            return res.json({message:"success"});
        })(req, res, next);   
    }
    async getAllSubCategory(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const {categoryId} = req.params;
            let filter = {};
            if (categoryId) filter = req.params;
            const result = await subCategoryModel.find(filter);
            return res.json({message:"success",result});
        })(req, res, next);   
    }
    async getSubCategory(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const {id} = req.params;
            const result = await subCategoryModel.findById(id);
            if (!result) return next(new AppError('category not found', 404));
            return res.json({message:"success", result});
        })(req, res, next);   
    }
}


const subCategory:SubCategory = new SubCategory();

export default subCategory;