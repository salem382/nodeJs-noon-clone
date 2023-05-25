import  express  from "express";
import user from "../controlles/user";
import { idValidation, nameValidation, nameAndIdValidation } from "../validation/global.validation";
import validation from "../middleware/validation";
import { fileUpload, validation_object } from "../middleware/fileUploads";
import { allowedTo, protectRoute } from "../middleware/protectRoute";

const userRouter = express.Router();


userRouter.route('/')
    .post(protectRoute, allowedTo('admin') ,fileUpload(validation_object.image, 'user').single('image'),user.addUser)
    .get(protectRoute, allowedTo('admin') ,user.getAllUsers);

userRouter.route('/:id')
    .put(protectRoute, allowedTo('admin') ,fileUpload(validation_object.image, 'user').single('image'),user.updateUser)
    .delete(protectRoute, allowedTo('admin') ,validation(idValidation), user.deleteUser)
    .get(protectRoute, allowedTo('admin') ,validation(idValidation), user.getUser)
    .patch(protectRoute, allowedTo('admin') ,user.changePassword)

export default userRouter;