import { AppError, catchError } from "../utls/ApiErrors";
import { generateToken, verifyPassword } from "../utls/baseFunction";
import userModel from "../models/user.models";


class Auth {
 

    async signUp(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const {email} = req.body;
            const user = await userModel.findOne({email});
            if (user) return next(new AppError('user already exist use another email',409));
            let result = new userModel(req.body);
            await result.save();
            return res.json({message:"success"});
        })(req, res, next);   
    }
    async signIn(req:any, res:any, next:any):Promise<void>  {
        catchError(async (req:any, res:any, next:any) => {

            const {email, password} = req.body;
            const user = await userModel.findOne({email});
            if (!user || !(await verifyPassword(password, user?.password)))
                return next(new AppError('incorect email or password',401));   
            const token = generateToken({id:user._id,name:user.name, role:user.role, status:user.isActive}); 
            return res.json({message:"success", token});
        })(req, res, next);   
    }
}

const auth:Auth = new Auth();

export default auth;