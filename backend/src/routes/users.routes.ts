import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { register, login, me, updateUser } from "../controllers/users.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, me);
router.put("/:id", updateUser);

export default router;