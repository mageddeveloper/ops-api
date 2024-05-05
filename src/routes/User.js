import express from "express";
import verifyToken from '@middlewares/auth.js';
import { getUsers, setUserTimezone } from "@controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/setUserTimezone", verifyToken, setUserTimezone);


export default router;