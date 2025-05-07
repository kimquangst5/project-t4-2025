import express from "express";
import { productsController } from "../../controllers/admin/products.controller";
import multer from "multer";
import { image_multiple } from "../../middlewares/admin/uploadCloud.middleware";
const upload = multer();

const router = express.Router();

router.get("/create", productsController.create);
router.post(
    "/create",
    upload.array("images", 6),
    image_multiple,
    productsController.createPost,
);

export default router;
