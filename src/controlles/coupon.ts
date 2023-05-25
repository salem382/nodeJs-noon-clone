import { AppError, catchError } from "../utls/ApiErrors";
import couponModel from "../models/coupon.models";
import QRCode from 'qrcode'

class Coupon {
 
    async addCoupon(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            console.log (req.body)
            let result = new couponModel(req.body)
            await result.save();
            return res.json({message:"success", result});
        })(req, res, next);   
    }
    async updateCoupon(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const{id} = req.params;
            const result = await couponModel.findOneAndUpdate({_id:id},req.body , {new:true});
            if (!result) return next(new AppError('Coupon not found', 404));
            return res.json({message:"success"});
        })(req, res, next);   
    }
    
    async deleteCoupon(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const {id} = req.params;
            const result = await couponModel.findOneAndDelete({_id:id}, {new:true});
            if (!result) return next(new AppError('Coupon not found', 404));
            return res.json({message:"success"});
        })(req, res, next);   
    }
    async getAllCoupon(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {
            const result = await couponModel.find();
            return res.json({message:"success",result});
        })(req, res, next);   
    }
    async getCoupon(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const {id} = req.params;
            const result = await couponModel.findById(id);
            if (!result) return next(new AppError('Coupon not found', 404));
            let url = await QRCode.toDataURL(result.code)
            return res.json({message:"success", result, url});
        })(req, res, next);   
    }
}

const coupon:Coupon = new Coupon();

export default coupon;