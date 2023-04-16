import  express  from "express";
import auth from "../controlles/auth";
import validation from "../middleware/validation";
import { addUser } from "../validation/user.validation";

const authRouter = express.Router();


authRouter.post('/signup',auth.signUp);
authRouter.post('/signin',auth.signIn);

export default authRouter;