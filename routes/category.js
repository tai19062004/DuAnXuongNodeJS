import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  removeCategoryById,
  softRemoveCategoryById,
  updateCategoryById,
} from "../controllers/category.js";
import categorySchema from "../validations/category.js";
import { checkAuth } from "../middlwares/checkAuth.js";
import { checkIsAdmin } from "../middlwares/checkIsAdmin.js";
import validBodyRequest from "../middlwares/validRequestBody.js";

const categoryRouter = Router();

categoryRouter.get("/", getCategories);
categoryRouter.get("/:id", getCategoryById);

categoryRouter.use(checkAuth, checkIsAdmin);
categoryRouter.put("/hide/:id", softRemoveCategoryById);
categoryRouter.delete("/delete/:id", removeCategoryById);


categoryRouter.use(validBodyRequest(categorySchema));
categoryRouter.post("/", createCategory);
categoryRouter.put("/update/:id", updateCategoryById);

export default categoryRouter;