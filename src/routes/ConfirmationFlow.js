import express from 'express';
import verifyToken from '@middlewares/auth.js';
import { validate } from "@requests/validation.js";
import * as confirmationFlow from '@controllers/confirmationFlowController.js';
import { confirmationflowRequest } from '@requests/confirmation/confirmationflowRequest.js';

const router = express.Router();

// Define routes for ConfirmationFlow
router.get('/', verifyToken, confirmationFlow.listConfirmationFlows);
router.post('/', verifyToken, validate(confirmationflowRequest),confirmationFlow.createConfirmationFlow);
router.get('/:id', verifyToken, confirmationFlow.getConfirmationFlow);
router.put('/:id', verifyToken, confirmationFlow.updateConfirmationFlow);
router.delete('/:id', verifyToken, confirmationFlow.deleteConfirmationFlow);

export default router;
