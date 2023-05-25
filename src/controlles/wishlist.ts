import { AppError, catchError } from "../utls/ApiErrors";
import userModel from "../models/user.models";


class Wishlist {
 
    async addWishlist(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const{product} = req.body;
            const result = await userModel.findByIdAndUpdate(req.user._id,{$addToSet:{wishlist:product}} , {new:true});
            if (!result) return next(new AppError('product not found', 404));
            return res.json({message:"success", result});
        })(req, res, next);   
    }
    async removeWishlist(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const{product} = req.body;
            const result = await userModel.findByIdAndUpdate(req.user._id,{$pull:{wishlist:product}} , {new:true});
            if (!result) return next(new AppError('product not found', 404));
            return res.json({message:"success", result});
        })(req, res, next);   
    }
    async getAllWishlist(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const result = await userModel.findById(req.user._id).select('wishlist').populate('wishlist');
            if (!result) return next(new AppError('user not found', 404));
            return res.json({message:"success", result});
        })(req, res, next);   
    }
   
}

const wishlist:Wishlist = new Wishlist();

export default wishlist;