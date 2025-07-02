import express, { NextFunction, Request, Response } from "express";
import Router from "../../models/router.router";
// Middleware kiểm tra tiền tố (prefix) có khớp với management_variable không
const checkPrefix = async (req: Request, res: Response, next: NextFunction) => {
    next()
    
};

export default checkPrefix;
