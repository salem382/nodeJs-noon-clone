import  express  from "express";
import brand from "../controlles/brand";
import { idValidation, nameValidation, nameAndIdValidation } from "../validation/global.validation";
import validation from "../middleware/validation";
import { fileUpload, validation_object } from "../middleware/fileUploads";
import { protectRoute, allowedTo } from "../middleware/protectRoute";

const brandRouter = express.Router();



brandRouter.route('/')
    .post(protectRoute, allowedTo('admin') ,fileUpload(validation_object.image, 'brand').single('image'), validation(nameValidation),brand.addBrand)
    .get(brand.getAllBrands);

brandRouter.route('/:id')
    .put(protectRoute, allowedTo('admin') ,brand.updateBrand)
    .delete(protectRoute, allowedTo('admin') ,validation(idValidation), brand.deleteBrand)
    .get(validation(idValidation), brand.getBrand)

export default brandRouter;