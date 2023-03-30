import  express  from "express";
import category from "../controlles/category";
import SubcategoryRouter from "./subCategory.routes";

const categoryRouter = express.Router();


categoryRouter.use('/:categoryId/subcategory', SubcategoryRouter);

categoryRouter.route('/').post(category.addCategory).get(category.getAllCategory);

categoryRouter.route('/:id')
.put(category.updateCategory)
.delete(category.deleteCategory)
.get(category.getCategory)

export default categoryRouter;