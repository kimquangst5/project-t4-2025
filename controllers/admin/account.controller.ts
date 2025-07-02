import express, { Request, Response } from "express";
import Router from "../../models/router.router";
import bcrypt from "bcrypt";
import {
    hash_password,
    verify_password,
} from "../../helpers/hash_password.helper";
import Accounts from "../../models/accounts.model";
import { jwt_create } from "../../helpers/jwt.helper";

const login = async (req: Request, res: Response) => {
    res.render("admin/pages/accounts/login.pug", {
        PAGE_TITLE: res.locals.ADMIN_ROUTER.login.title,
        PAGE_DESCRIPTION: res.locals.ADMIN_ROUTER.login.description,
        PAGE_KEYWORD: res.locals.ADMIN_ROUTER.login.keyword,
    });
};

const login_patch = async (req: Request, res: Response) => {
    const { username, password, rememeber } = req.body;

    const account = await Accounts.findOne({
        username: username,
    }).select("password username");

    if (await verify_password(password, account.password)) {
        const create_token = jwt_create(
            {
                _id: account._id,
                username: account.username,
                password: account.password,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1h",
            },
        );
        await Accounts.updateOne(
            {
                username: username,
            },
            {
                token: create_token,
            },
        );
        res.cookie("TOKEN", create_token);
    }
    res.json({
        success: true,
        continue: req.body.continue
            ? req.body.continue
            : `/${res.locals.ADMIN_ROUTER.management_variable}/${res.locals.ADMIN_ROUTER.routers.path}/${res.locals.ADMIN_ROUTER.routers.index.name}`,
    });
};

const create = async (req: Request, res: Response) => {
    res.render("admin/pages/accounts/create.pug", {
        PAGE_TITLE: res.locals.ADMIN_ROUTER.accounts.create.title,
        PAGE_DESCRIPTION: res.locals.ADMIN_ROUTER.accounts.create.description,
        PAGE_KEYWORD: res.locals.ADMIN_ROUTER.accounts.create.keyword,
    });
};

const create_post = async (req: Request, res: Response) => {
    let { username, password, confirm_password } = req.body;
    req.body.password = await hash_password(password);
    await Accounts.create(req.body);

    res.json({
        success: true,
    });
};

export const accountController = {
    login,
    login_patch,
    create,
    create_post,
};
