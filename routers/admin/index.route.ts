import checkPrefix from "../../middlewares/admin/check_router.middleware";
import Router from "../../models/router.router";
import dashboard from "./dashboard.route";
import products from "./products.route";
import routers from "./router.route";
const index = async (app: any) => {
  app.use(`/:prefix/dashboard`, checkPrefix, dashboard);
  app.use(`/:prefix/products`, checkPrefix, products);
  app.use(`/:prefix/routers`, checkPrefix, routers);
};
export default index;


