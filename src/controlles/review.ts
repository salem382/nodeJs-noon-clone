import { AppError, catchError } from "../utls/ApiErrors";
import reviewModel from "../models/reviewModel";


class Review {
 
    async addReview(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const isReview = await reviewModel.findOne({user:req.user._id, product:req.body.product});
            if (isReview) return next(new AppError('you can only review for one time',409))
            let result = new reviewModel(req.body)
            await result.save();
            return res.json({message:"success"});
        })(req, res, next);   
    }
    async updateReview(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const{id} = req.params;
            const result = await reviewModel.findOneAndUpdate({_id:id,user:req.user._id},req.body , {new:true});
            if (!result) return next(new AppError('Review not found', 404));
            return res.json({message:"success"});
        })(req, res, next);   
    }
    
    async deleteReview(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const {id} = req.params;
            const result = await reviewModel.findOneAndDelete({_id:id, user:req.user._id}, {new:true});
            if (!result) return next(new AppError('Review not found', 404));
            return res.json({message:"success"});
        })(req, res, next);   
    }
    async getAllReview(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {
            const {productId} = req.body;
            const result = await reviewModel.find({product:productId});
            return res.json({message:"success",result});
        })(req, res, next);   
    }
    async getReview(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const {id} = req.params;
            const result = await reviewModel.findById(id);
            if (!result) return next(new AppError('Review not found', 404));
            return res.json({message:"success", result});
        })(req, res, next);   
    }
}

const review:Review = new Review();

export default review;