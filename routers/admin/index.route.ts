import { NextFunction, Request, Response } from "express";
import checkPrefix from "../../middlewares/admin/check_router.middleware";
import Router from "../../models/router.router";
import dashboard from "./dashboard.route";
import products from "./products.route";
import routers from "./router.route";
import accounts from "./account.route";
import check_login from "../../middlewares/admin/check_login.middleware";

const index = async (app: any) => {
    app.use(async (req: Request, res: Response, next: NextFunction) => {
        res.locals.ADMIN_ROUTER = await Router.findOne({
            type: "admin",
        });
        next();
    });
    app.use(check_login);
    app.use(
        `/:seg_1/:seg_2`,
        async (req: Request, res: Response, next: NextFunction) => {
            const { seg_1, seg_2 } = req.params;
            const ADMIN_ROUTER = res.locals.ADMIN_ROUTER;
            if (seg_1 == ADMIN_ROUTER.management_variable) {
                if (seg_2 == ADMIN_ROUTER.products.path) {
                    return products(req, res, next);
                } else if (seg_2 == ADMIN_ROUTER.routers.path) {
                    return routers(req, res, next);
                } else if (
                    seg_2 == ADMIN_ROUTER.login.name ||
                    seg_2 == ADMIN_ROUTER.accounts.path ||
                    seg_2 == ADMIN_ROUTER.login.patch
                ) {
                    return accounts(req, res, next);
                }
            }
        },
    );
};
export default index;
