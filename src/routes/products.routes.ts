import  express  from "express";
import product from "../controlles/products";


const productRouter = express.Router();



productRouter.route('/').post(product.addProduct).get(product.getAllProducts);

productRouter.route('/:id')
.put(product.updateProduct)
.delete(product.deleteProduct)
.get(product.getProduct)

export default productRouter;