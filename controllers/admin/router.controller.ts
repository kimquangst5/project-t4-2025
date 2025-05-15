import express, { Request, Response } from "express";
import Router from "../../models/router.router";

const index = async (req: Request, res: Response) => {
     const router_admin = await Router.findOne({
          type: 'admin'
     })
     console.log(req.params);
     
  res.render("admin/pages/routers/index.pug", {
      router_admin: router_admin,
  });
};

const update = async (req: Request, res: Response) => {
     const { list_router } = req.body;
     const admin = list_router.find((it: any) => it.type == "admin");
     const client = list_router.find((it: any) => it.type == "client");
     const admin_db = await Router.findOne({
          type: 'admin'
     })
     if (admin_db){
          await Router.updateOne(admin);
     }
     else{
          const new_router = new Router(admin);
          await new_router.save()
     }

    res.status(200).json({
        success: true,
        redirect: `/${admin.management_variable}/routers/list`,
    });
};
export const routerController = {
    index, update
};
