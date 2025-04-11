import express, { Application } from "express";
import databse from "./database/connect";

databse();
const app: Application = express();
const port: Number = 5000;

import routeClient from "./routers/client/index.route";
import routeAdmin from "./routers/admin/index.route";

app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);

routeClient(app);
routeAdmin(app);

app.use(express.static(`${__dirname}/public`));

app.listen(port, () => {
  console.log(`Đang lắng nghe cổng ${port}`);
});
