import  express  from "express";
import product from "../controlles/products";
import { fileUpload, validation_object } from "../middleware/fileUploads";
import { protectRoute, allowedTo } from "../middleware/protectRoute";

const productRouter = express.Router();

let fieldsArr = [{ name: 'imgCover', maxCount: 1, acceptedTypes: ['image/jpeg', 'image/png']}, { name: 'imgs', maxCount: 10, acceptedTypes: ['image/jpeg', 'image/png']}]


productRouter.route('/')
    .post(protectRoute, allowedTo('admin') ,fileUpload(validation_object.image, 'product').fields(fieldsArr), product.addProduct)
    .get(product.getAllProducts);

productRouter.route('/:id')
    .put(protectRoute, allowedTo('admin') ,product.updateProduct)
    .delete(protectRoute, allowedTo('admin') ,product.deleteProduct)
    .get(product.getProduct)

export default productRouter;
