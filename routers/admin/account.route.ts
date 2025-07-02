import express, { NextFunction, Request, Response } from "express";
import checkPrefix from "../../middlewares/admin/check_router.middleware";
import { accountController } from "../../controllers/admin/account.controller";
import Router from "../../models/router.router";
import multer from "multer";
import { login, login_patch } from "../../middlewares/admin/accounts.middleware";
const router = express.Router({ mergeParams: true });
const upload = multer();
router.get("", login, accountController.login);

router.patch("", login_patch, accountController.login_patch);

router.get(
    "/:seg_3",
    async (req: Request, res: Response, next: NextFunction) => {
        const { seg_3, seg_4 } = req.params;

        const ADMIN_ROUTER = res.locals.ADMIN_ROUTER;
        if (seg_3 == ADMIN_ROUTER.accounts.create.name) next();
    },
    accountController.create,
);

router.post(
    "/:seg_3",
    async (req: Request, res: Response, next: NextFunction) => {
        const { seg_3, seg_4 } = req.params;
        
        const ADMIN_ROUTER = res.locals.ADMIN_ROUTER;
        if (seg_3 == ADMIN_ROUTER.accounts.create.post) next();
    },
    upload.single('avatar'),
    accountController.create_post,
);

export default router;
