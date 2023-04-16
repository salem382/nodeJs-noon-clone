import  jwt from "jsonwebtoken";
import { AppError } from "../utls/ApiErrors";
import userModel from "../models/user.models";

export const protectRoute = (req:any, res:any, next:any):void => {

    const token = req.header('token');

    jwt.verify(token!, 'myNameIsUser', async (err:any, decode:any) => {
        
        if (err) return next(new AppError(err.message, 401));
        const user = await userModel.findById(decode.id);
        if (!user) return next(new AppError('invalid token', 401));
        //if ((user.passwordChangedAt.getTime() / 1000) > decode.iat)  return next(new AppError('invalid token', 401));
        req.user = user;
        next();
    });
}


export const allowedTo =(...roles:string[]) => {
    return (req:any, res:any, next:any):void => {

        if (!roles.includes(req.user.role)) return next(new AppError('you can not do this you are ' +req.user.role , 401));
        next(); 
    }
}


