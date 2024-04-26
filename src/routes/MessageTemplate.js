import express from 'express';
import verifyToken from '@middlewares/auth.js';
import { validate } from "@requests/validation.js";
import { listRequest } from '@requests/messageTemplate/listRequest.js';
import * as messageTemplateController from '@controllers/messageTemplateController.js';
import { messagetemplateRequest } from '@requests/messageTemplate/messagetemplateRequest.js';

const router = express.Router();

// Define routes for MessageTemplate
router.post('/list', verifyToken, validate(listRequest), messageTemplateController.listMessageTemplates);
router.post('/', verifyToken, validate(messagetemplateRequest), messageTemplateController.createMessageTemplate);
router.get('/:id', verifyToken, messageTemplateController.getMessageTemplate);
router.put('/:id', verifyToken, messageTemplateController.updateMessageTemplate);
router.delete('/:id', verifyToken, messageTemplateController.deleteMessageTemplate);

export default router;
