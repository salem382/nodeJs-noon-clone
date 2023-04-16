import { AppError, catchError } from "../utls/ApiErrors";
import userModel from "../models/user.models";


class User {
 
    async addUser(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const {email} = req.body;
            const user = await userModel.findOne({email});
            if (user) return next(new AppError('user already exist use another email',409));
            let result = new userModel(req.body);
            await result.save();
            return res.json({message:"success"});
        })(req, res, next);   
    }
    async updateUser(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const{id} = req.params;
            const User = await userModel.findByIdAndUpdate(id, req.body , {new:true});
            if (!User) return next(new AppError('User not found', 404));
            return res.json({message:"success"});
        })(req, res, next);   
    }
    async deleteUser(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const {id} = req.params;
            const User = await userModel.findByIdAndDelete(id, {new:true});
            if (!User) return next(new AppError('User not found', 404));
            return res.json({message:"success"});
        })(req, res, next);   
    }
    async getAllUsers(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const result = await userModel.find({});
            return res.json({message:"success",result});
        })(req, res, next);   
    }
    async getUser(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const {id} = req.params;
            const result = await userModel.findById(id);
            if (!result) return next(new AppError('User not found', 404));
            return res.json({message:"success", result});
        })(req, res, next);   
    }
    async changePassword(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const {id} = req.params;
            const result = await userModel.findOneAndUpdate({_id:id}, req.body, {new:true});
            if (!result) return next(new AppError('User not found', 404));
            result.passwordChangedAt = new Date();
            await result.save();
            return res.json({message:"success", result});
        })(req, res, next);   
    }
}

const user:User = new User();

export default user;