import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controllers.js";
import upload from "../middlewares/multer.js";

const router=Router();

router.get("/getUsersForSidebar",protectRoute,getUsersForSidebar);
router.get("/:id",protectRoute,getMessages);
router.post("/sendMessage",protectRoute,upload.single("image"),sendMessage);

export default router;