import express, { NextFunction, Request, Response } from "express";
import Router from "../../models/router.router";
import bcrypt from "bcrypt";
import {
    hash_password,
    verify_password,
} from "../../helpers/hash_password.helper";
import Accounts from "../../models/accounts.model";
import { jwt_create, jwt_verify } from "../../helpers/jwt.helper";

const login = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies["TOKEN"];
    if (token) {
        const check_token = await jwt_verify(token, process.env.JWT_SECRET_KEY);
        if (check_token != null) {
          const redirect = req.query.continue ? req.query.continue as string : `/${res.locals.ADMIN_ROUTER.management_variable}/${res.locals.ADMIN_ROUTER.routers.path}/${res.locals.ADMIN_ROUTER.routers.index.name}`
            res.redirect(redirect);
            return;
        }
    }
    next();
};

const login_patch = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, rememeber } = req.body;
    if (!username || !password)
        res.json({
            success: false,
            message: "Vui lòng nhập tài khoản và mật khẩu!",
        });
    const account = await Accounts.findOne({
        username: username,
    });
    if (
        !account ||
        (account &&
            (await verify_password(password, account.password)) == false)
    )
        res.json({
            success: false,
            message: "Tài khoản hoặc mật khẩu không hợp lệ!",
        });
    next();
};

export { login, login_patch };
