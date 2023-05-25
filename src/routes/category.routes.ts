import  express  from "express";
import category from "../controlles/category";
import SubcategoryRouter from "./subCategory.routes";
import validation from "../middleware/validation";
import { idValidation, nameValidation, nameAndIdValidation } from "../validation/global.validation";
import { validation_object, fileUpload } from "../middleware/fileUploads";
import { allowedTo, protectRoute } from "../middleware/protectRoute";


const categoryRouter = express.Router();


categoryRouter.use('/:categoryId/subcategory', SubcategoryRouter);

categoryRouter.route('/')
    .post( protectRoute, allowedTo('admin') ,fileUpload(validation_object.image, 'category').single('image'), validation(nameValidation),category.addCategory)
    .get( category.getAllCategory);
categoryRouter.route('/:id')
.put( protectRoute, allowedTo('admin') ,fileUpload(validation_object.image, 'category').single('image'), validation(nameAndIdValidation),category.updateCategory)
.delete( protectRoute, allowedTo('admin') ,validation(idValidation),category.deleteCategory)
.get(validation(idValidation),category.getCategory)

export default categoryRouter;