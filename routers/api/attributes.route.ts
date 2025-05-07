import express from "express";
import { productsController } from "../../controllers/api/products.controller";
import multer from "multer";
import { image_multiple } from "../../middlewares/admin/uploadCloud.middleware";
const upload = multer();

const router = express.Router();

router.get("/list", productsController.list);

router.get("/detail/:select_id", productsController.detail);

export default router;
