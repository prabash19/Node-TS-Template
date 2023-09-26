import { Router } from "express";
import { registerUser } from "../../controller/userController.js";

const router = Router();
router.post("/register", registerUser);
export default router;
