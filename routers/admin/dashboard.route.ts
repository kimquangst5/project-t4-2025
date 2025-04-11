import express from "express";
import { dashboardController } from "../../controllers/admin/dashboard.controller";
const router = express.Router();

router.get("/", dashboardController.index);

export default router;
