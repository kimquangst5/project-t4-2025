import express from "express";
import { productsController } from "../../controllers/admin/products.controller";
const router = express.Router();

router.get("/create", productsController.create);

export default router;
