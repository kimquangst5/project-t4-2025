import express, { Request, Response } from "express";
import Router from "../../models/router.router";

const index = async (req: Request, res: Response) => {
     
  res.render("admin/pages/routers/index.pug", {
      PAGE_TITLE: res.locals.ADMIN_ROUTER.routers.index.title,
      PAGE_DESCRIPTION: res.locals.ADMIN_ROUTER.routers.index.description,
      PAGE_KEYWORD: res.locals.ADMIN_ROUTER.routers.index.keyword
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
     console.log(
         `/${admin.management_variable}/${admin.routers.path}/${admin.routers.index.name}`,
     );
     

    res.status(200).json({
        success: true,
        redirect: `/${admin.management_variable}/${admin.routers.path}/${admin.routers.index.name}`,
    });
};
export const routerController = {
    index, update
};
