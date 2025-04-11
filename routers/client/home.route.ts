import express from "express";
import { homeController } from "../../controllers/client/home.controller";
const router = express.Router();

router.get("/", homeController.index);

export default router;
