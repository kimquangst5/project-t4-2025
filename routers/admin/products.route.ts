import express, { NextFunction, Request, Response } from "express";
import { productsController } from "../../controllers/admin/products.controller";
import multer from "multer";
import { image_multiple } from "../../middlewares/admin/uploadCloud.middleware";
import checkPrefix from "../../middlewares/admin/check_router.middleware";
import Router from "../../models/router.router";
const upload = multer();

const router = express.Router( { mergeParams: true });

router.get("/:seg_3", async (req: Request, res: Response, next: NextFunction) => {
    const { seg_3, seg_4 } = req.params;
    
    const ADMIN_ROUTER = res.locals.ADMIN_ROUTER;
    if (seg_3 == ADMIN_ROUTER.products.create.name) {
        next();
    }
    
}, productsController.create);
router.post(
    "/:seg_3",
    async (req: Request, res: Response, next: NextFunction) => {
        const { seg_3, seg_4 } = req.params;
        console.log(seg_3);
        
        const ADMIN_ROUTER = res.locals.ADMIN_ROUTER;
        if (seg_3 == ADMIN_ROUTER.products.create.post) {
            console.log('ok post đã thông');
            
            next();
        }
    },
    upload.array("images", 6),
    image_multiple,
    productsController.createPost,
);

export default router;
