import { AppError, catchError } from "../utls/ApiErrors";
import slugify from "slugify";
import subCategoryModel from "../models/subCategory.model";
import ApiFeatures from "../utls/ApiFeatures";

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

            let length = (await subCategoryModel.find()).length;
        
            let apiFeatures = new ApiFeatures(subCategoryModel.find(), req.query)
            .pagination().search().sort().select().filter();
            let result = await apiFeatures.mongooseQuery.populate('categoryId', 'name -_id')

            return res.json({message:"success",currentPage : apiFeatures.page, pagesLength:Math.ceil(length / apiFeatures.pagesLength),result});
        })(req, res, next);   
    }
    async getSubCategory(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const {id} = req.params;
            const result = await subCategoryModel.findById(id).populate('categoryId');
            if (!result) return next(new AppError('category not found', 404));
            return res.json({message:"success", result});
        })(req, res, next);   
    }
}


const subCategory:SubCategory = new SubCategory();

export default subCategory;