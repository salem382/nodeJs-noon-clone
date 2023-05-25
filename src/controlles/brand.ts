import { AppError, catchError } from "../utls/ApiErrors";
import slugify from "slugify";
import brandModel from "../models/brand.model";
import ApiFeatures from "../utls/ApiFeatures";


class Brand {
 
    async addBrand(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            req.body.slug = slugify(req.body.name);
            req.body.logo = req.file.filename;
            let result = new brandModel(req.body);
            await result.save();
            return res.json({message:"success"});
        })(req, res, next);   
    }
    async updateBrand(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const{id} = req.params;
            req.body.slug = slugify(req.body.name);
            req.body.logo = req.file.filename;
            const brand = await brandModel.findByIdAndUpdate(id, req.body , {new:true});
            if (!brand) return next(new AppError('brand not found', 404));
            return res.json({message:"success"});
        })(req, res, next);   
    }
    async deleteBrand(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const {id} = req.params;
            const brand = await brandModel.findByIdAndDelete(id, {new:true});
            if (!brand) return next(new AppError('Brand not found', 404));
            return res.json({message:"success"});
        })(req, res, next);   
    }
    async getAllBrands(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            let length = (await brandModel.find()).length;
        
            let apiFeatures = new ApiFeatures(brandModel.find(), req.query)
            .pagination().search().sort().select().filter();
            let result = await apiFeatures.mongooseQuery;

            return res.json({message:"success",currentPage : apiFeatures.page, pagesLength:Math.ceil(length / apiFeatures.pagesLength),result});
      
        })(req, res, next);   
    }
    async getBrand(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const {id} = req.params;
            const result = await brandModel.findById(id);
            if (!result) return next(new AppError('Brand not found', 404));
            return res.json({message:"success", result});
        })(req, res, next);   
    }
}

const brand:Brand = new Brand();

export default brand;