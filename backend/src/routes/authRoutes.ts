import { Router } from "express";
import { register, login, me } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/me", authMiddleware, me);

export default router;