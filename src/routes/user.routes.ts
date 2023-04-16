import  express  from "express";
import user from "../controlles/user";
import { idValidation, nameValidation, nameAndIdValidation } from "../validation/global.validation";
import validation from "../middleware/validation";


const userRouter = express.Router();


userRouter.route('/')
    .post(user.addUser)
    .get(user.getAllUsers);

userRouter.route('/:id')
    .put(user.updateUser)
    .delete(validation(idValidation), user.deleteUser)
    .get(validation(idValidation), user.getUser)
    .patch(user.changePassword)


export default userRouter;