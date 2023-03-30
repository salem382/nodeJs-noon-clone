import  express  from "express";
import subCategory from "../controlles/subCategory";

const SubcategoryRouter = express.Router({mergeParams:true});


SubcategoryRouter.route('/').post(subCategory.addSubCategory).get(subCategory.getAllSubCategory);

SubcategoryRouter.route('/:id')
.put(subCategory.updateSubCategory)
.delete(subCategory.deleteSubCategory)
.get(subCategory.getSubCategory)

export default SubcategoryRouter;