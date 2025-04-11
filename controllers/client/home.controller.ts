import { Request, Response } from "express";

const index = async (req: Request, res: Response) => {
  res.render("client/pages/home/index.pug", {});
};
export const homeController = {
  index,
};
