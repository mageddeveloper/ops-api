import express from 'express';
import * as messageTemplateController from '@controllers/messageTemplateController.js';
import verifyToken from '@middlewares/auth.js';

const router = express.Router();

// Define routes for MessageTemplate
router.get('/', verifyToken, messageTemplateController.listMessageTemplates);
router.post('/', verifyToken, messageTemplateController.createMessageTemplate);
router.get('/:id', verifyToken, messageTemplateController.getMessageTemplate);
router.put('/:id', verifyToken, messageTemplateController.updateMessageTemplate);
router.delete('/:id', verifyToken, messageTemplateController.deleteMessageTemplate);

export default router;
