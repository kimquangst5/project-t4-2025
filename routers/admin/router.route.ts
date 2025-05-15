import express from "express";
import { routerController } from "../../controllers/admin/router.controller";
const router = express.Router();

router.get("/list", routerController.index);
router.patch("/update", routerController.update);

export default router;
