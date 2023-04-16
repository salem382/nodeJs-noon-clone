import  express  from "express";
import subCategory from "../controlles/subCategory";
import { idValidation, nameAndIdValidation, nameValidation } from "../validation/global.validation";
import validation from "../middleware/validation";
import { protectRoute, allowedTo } from "../middleware/protectRoute";

const SubcategoryRouter = express.Router({mergeParams:true});


SubcategoryRouter.route('/')
    .post(protectRoute, allowedTo('admin'), validation(nameAndIdValidation), subCategory.addSubCategory)
    .get(subCategory.getAllSubCategory);

SubcategoryRouter.route('/:id')
    .put(protectRoute, allowedTo('admin'),validation(nameAndIdValidation), subCategory.updateSubCategory)
    .delete(protectRoute, allowedTo('admin'),validation(idValidation), subCategory.deleteSubCategory)
    .get(validation(idValidation), subCategory.getSubCategory)

export default SubcategoryRouter;
