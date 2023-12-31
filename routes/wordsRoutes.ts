import { Router } from "express";
import wordsController from "../controllers/wordsController";
const router = Router();

router.post("/create", wordsController.create);
router.get("/getAll", wordsController.getAll);

export default router;
