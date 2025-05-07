import attributes from "./attributes.route";
const index = (app: any) => {
  app.use("/api/attributes", attributes);
};
export default index;
