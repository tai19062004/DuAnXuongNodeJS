import { Router } from "express";
import productRouter from "./product.js";
import authRouter from "./auth.js";
import categoryRouter from "./category.js";

const router = Router();

router.use("/products", productRouter);
router.use("/auth", authRouter);
router.use('/category', categoryRouter)

export default router;
