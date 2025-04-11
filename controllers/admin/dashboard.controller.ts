import { Request, Response } from "express";

const index = async (req: Request, res: Response) => {
  res.render("admin/pages/dashboard/index.pug", {});
};
export const dashboardController = {
  index,
};
