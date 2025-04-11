import { Request, Response } from "express";

const create = async (req: Request, res: Response) => {
  console.log('ok');
  
  res.render("admin/pages/products/create.pug", {});
};
export const productsController = {
  create,
};
