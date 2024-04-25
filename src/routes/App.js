import express from 'express';
import { listUserApps, createApp, getApp, updateApp, deleteApp } from '@controllers/appController.js';
import { validate } from "@requests/validation.js";
import { appRequest } from "@requests/app/appRequest.js";
import verifyToken from '@middlewares/auth.js';

const router = express.Router();

// Define routes for App
router.get('/', verifyToken, listUserApps);
router.post('/', validate(appRequest), verifyToken, createApp);
router.get('/:id', verifyToken, getApp);
router.put('/:id', verifyToken, updateApp);
router.delete('/:id', verifyToken, deleteApp);

export default router;
