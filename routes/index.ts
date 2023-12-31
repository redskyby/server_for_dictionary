import { Router } from "express";
import wordsRoutes from "./wordsRoutes";
import userRoutes from "./userRoutes";
const router = Router();

//rest api
router.use("/word", wordsRoutes);
router.use("/user", userRoutes);

export default router;
