import { Router } from "express";
import { login,register,logout,updateProfile, me } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.js";


const router = Router();
router.post("/login",login);
router.post("/register",register);
router.post("/logout",logout);
router.put("/update-profile",protectRoute,upload.single("profilePic"),updateProfile);
router.get("/me", protectRoute, me);

export default router;