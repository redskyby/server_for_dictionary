import { Router } from "express";
import userController from "../controllers/userController";
const router = Router();
import authMiddleware from "../middleWare/authMiddleWare";

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/check", authMiddleware, userController.check);

export default router;
