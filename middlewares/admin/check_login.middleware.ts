import express, { NextFunction, Request, Response } from "express";
import Router from "../../models/router.router";
import { jwt_verify } from "../../helpers/jwt.helper";
import Accounts from "../../models/accounts.model";
// Middleware kiểm tra tiền tố (prefix) có khớp với management_variable không
const check_login = async (req: Request, res: Response, next: NextFunction) => {
    if (
        req.path ==
            `/${res.locals.ADMIN_ROUTER.management_variable}/${res.locals.ADMIN_ROUTER.login.name}` ||
        req.path.split("/")[1] != res.locals.ADMIN_ROUTER.management_variable
    ) {
        // res.clearCookie("alert_quick");
        next();
    } else {
        let token = req.cookies["TOKEN"];
        if (!token) {
            res.redirect(
                `/${res.locals.ADMIN_ROUTER.management_variable}/${res.locals.ADMIN_ROUTER.login.name}?continue=${req.path}`,
            );
            return;
        } else {
            const check_token = await jwt_verify(
                token,
                process.env.JWT_SECRET_KEY,
            );
            if (check_token == null) {
                res.clearCookie("TOKEN");
                res.cookie(
                    "alert_quick",
                    JSON.stringify({
                        title: "Hết phiên đăng nhập. Vui lòng đăng nhập lại!",
                        icon: "warning",
                        position: "top-right",
                    }),
                );
                res.redirect(
                    `/${res.locals.ADMIN_ROUTER.management_variable}/${res.locals.ADMIN_ROUTER.login.name}?continue=${req.path}`,
                );
                return;
            } else {
                const account = await Accounts.findOne({
                    _id: check_token._id,
                });
                if (account.token !== token) {
                    res.clearCookie("TOKEN");
                    res.cookie(
                        "alert_quick",
                        JSON.stringify({
                            title: "Tài khoản của bạn đã được đăng nhập ở nơi khác!",
                            icon: "warning",
                            position: "top-right",
                        }),
                    );
                    res.redirect(
                        `/${res.locals.ADMIN_ROUTER.management_variable}/${res.locals.ADMIN_ROUTER.login.name}?continue=${req.path}`,
                    );
                    return;
                }
            }
        }
        next();
    }
};

export default check_login;
