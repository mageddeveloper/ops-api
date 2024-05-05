import express from 'express';
import * as appController from '@controllers/appController.js';
import { validate } from "@requests/validation.js";
import { appRequest } from "@requests/app/appRequest.js";
import { setConfirmationFlowRequest } from "@requests/app/setConfirmationFlowRequest.js";
import { setCurrentAppRequest } from "@requests/app/setCurrentAppRequest.js";
import verifyToken from '@middlewares/auth.js';
const router = express.Router();

// Define routes for App
router.get('/', verifyToken, appController.listUserApps);
router.post('/', validate(appRequest), verifyToken, appController.createApp);
router.post('/setConfirmationFlow', validate(setConfirmationFlowRequest), verifyToken, appController.setConfirmationFlow);
router.get('/:id', verifyToken, appController.getApp);
router.put('/:id', verifyToken, appController.updateApp);
router.delete('/:id', verifyToken, appController.deleteApp);

router.post('/setCurrentApp', validate(setCurrentAppRequest), verifyToken, appController.setCurrentApp);

export default router;
