import express, { Application } from "express";
import database from "./database/connect";
import routeClient from "./routers/client/index.route";
import routeAdmin from "./routers/admin/index.route";
import routeApi from "./routers/api/index.route";
import path from "path";
import bodyParser from 'body-parser'

database();
const app: Application = express();
const port: Number = 3000;
const isDist = __dirname.includes("dist");
const nodeModulesPath = isDist
    ? path.join(__dirname, "..", "node_modules")
    : path.join(__dirname, "node_modules");
    
    
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);

routeClient(app);
routeAdmin(app);
routeApi(app);

app.use(`/node_modules`, express.static(nodeModulesPath));

app.use(express.static(`${__dirname}/public`));

app.listen(port, () => {
    console.log(`Đang lắng nghe cổng ${port}`);
});
