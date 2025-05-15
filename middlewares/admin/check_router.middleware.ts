import express, { NextFunction, Request, Response } from "express";
import Router from "../../models/router.router";

// Middleware kiểm tra tiền tố (prefix) có khớp với management_variable không
const checkPrefix = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const admin = await Router.findOne({ type: "admin" });
        const variable = admin.management_variable;
        console.log('ok');
        console.log(req.params);
        
        if (req.params.prefix === variable) {
            next(); // Tiền tố khớp, tiếp tục xử lý route
        } else {
          // console.log('sai ', req.params);
          
            res.redirect('/') // Tiền tố không khớp, bỏ qua route này
        }
    } catch (error) {
        console.error("Lỗi khi lấy management_variable:", error);
        res.status(500).send("Lỗi server");
    }
};

export default checkPrefix;
