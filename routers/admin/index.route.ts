import dashboard from "./dashboard.route";
import products from "./products.route";
const index = (app: any) => {
  app.use("/admin/dashboard", dashboard);
  app.use("/admin/products", products);
};
export default index;
