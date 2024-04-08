import { Router } from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  removeProductById,
  softRemoveProductById,
  updateProductById,
} from "../controllers/product.js";
import productSchema from "../validations/product.js";
import { checkAuth } from "../middlwares/checkAuth.js";
import { checkIsAdmin } from "../middlwares/checkIsAdmin.js";
import validBodyRequest from "../middlwares/validRequestBody.js";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);

productRouter.use(checkAuth, checkIsAdmin);
productRouter.put("/hide/:id", softRemoveProductById);
productRouter.delete("/delete/:id", removeProductById);

productRouter.use(validBodyRequest(productSchema));
productRouter.post("/", createProduct);
productRouter.put("/update/:id", updateProductById);

export default productRouter;
