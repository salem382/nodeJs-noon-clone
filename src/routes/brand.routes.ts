import  express  from "express";
import brand from "../controlles/brand";

const brandRouter = express.Router();



brandRouter.route('/').post(brand.addBrand).get(brand.getAllBrands);

brandRouter.route('/:id')
.put(brand.updateBrand)
.delete(brand.deleteBrand)
.get(brand.getBrand)

export default brandRouter;