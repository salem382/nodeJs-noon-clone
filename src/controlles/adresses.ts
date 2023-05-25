import { AppError, catchError } from "../utls/ApiErrors";
import userModel from "../models/user.models";


class Adresses {
 
    async addAdrees(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const result = await userModel.findByIdAndUpdate(req.user._id,{$addToSet:{adresses:req.body}} , {new:true});
            if (!result) return next(new AppError('user not found', 404));
            return res.json({message:"success", result});
        })(req, res, next);   
    }
    async removeAdress(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const{adress_id} = req.body;
            const result = await userModel.findByIdAndUpdate(req.user._id,{$pull:{adresses:{_id:adress_id}}} , {new:true});
            if (!result) return next(new AppError('user not found', 404));
            return res.json({message:"success", result:result.adresses});
        })(req, res, next);   
    }
    async getAllAdresees(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const result = await userModel.findById(req.user._id);
            if (!result) return next(new AppError('user not found', 404));
            return res.json({message:"success", result :result.adresses});
        })(req, res, next);   
    }
   
}

const adresses:Adresses = new Adresses();

export default adresses;