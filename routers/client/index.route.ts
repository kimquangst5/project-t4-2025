import home from "./home.route";

const index = (app: any) => {
  app.use("/", home);
};
export default index;
