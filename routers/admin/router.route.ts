import express, { NextFunction, Request, Response } from "express";
import checkPrefix from "../../middlewares/admin/check_router.middleware";
import { routerController } from "../../controllers/admin/router.controller";
import Router from "../../models/router.router";
const router = express.Router( { mergeParams: true });

router.get(
    "/:seg_3",
    async (req: Request, res: Response, next: NextFunction) => {
        const { seg_1, seg_2, seg_3, seg_4 } = req.params;
        const ADMIN_ROUTER = res.locals.ADMIN_ROUTER;
        if (seg_3 == ADMIN_ROUTER.routers.index.name) {
            next();
        }
    },
    routerController.index,
);
router.patch(
    "/:seg_3",
    async (req: Request, res: Response, next: NextFunction) => {
        const { seg_1, seg_2, seg_3, seg_4 } = req.params;
        const ADMIN_ROUTER = await Router.findOne({
                type: "admin",
            });
        console.log(ADMIN_ROUTER);
        
        if (seg_3 == ADMIN_ROUTER.routers.update.name) {
          console.log('ok');
          
            next();
        }
    },
    routerController.update,
);

export default router;