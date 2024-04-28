import express from 'express';
import verifyToken from '@middlewares/auth.js';
import { validate } from "@requests/validation.js";
import { listRequest } from '@requests/flowStep/listRequest.js';
import { flowStepRequest } from '@requests/flowStep/flowStepRequest.js';
import * as flowStepController from '@controllers/FlowStepController.js';

const router = express.Router();

// Define routes for FlowStep
router.post('/list', verifyToken, validate(listRequest), flowStepController.listFlowSteps);
router.post('/', verifyToken, validate(flowStepRequest), flowStepController.createFlowStep);
router.get('/:id', verifyToken, flowStepController.getFlowStep);
router.put('/:id', verifyToken, flowStepController.updateFlowStep);
router.delete('/:id', verifyToken, flowStepController.deleteFlowStep);

export default router;
