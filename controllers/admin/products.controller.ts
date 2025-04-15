import axios from "axios";
import { Request, Response } from "express";

const create = async (req: Request, res: Response) => {
    
  
  res.render("admin/pages/products/create.pug", {});
};
export const productsController = {
  create,
};
