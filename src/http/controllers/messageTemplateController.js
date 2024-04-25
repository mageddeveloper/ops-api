import MessageTemplate from '@models/MessageTemplate.js';
import * as messageTemplateService from '@services/messageTemplateService.js';

export const listMessageTemplates = async (req, res) => {
    try {
        // Call the service function to retrieve MessageTemplates with filters
        const MessageTemplates = await messageTemplateService.list(req.query);

        // Return the list of MessageTemplates in the response
        res.status(200).json(MessageTemplates);
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: 'Failed to fetch MessageTemplates', error: error.message });
    }
};

export const createMessageTemplate = async (req, res) => {
    try {
        // Create a new MessageTemplate instance
        const messagetemplate = new MessageTemplate(req.body);

        // Call the service function to create the MessageTemplate
        await messageTemplateService.create(messagetemplate);

        // Return the created MessageTemplate in the response
        res.status(201).json(messagetemplate);
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: 'Failed to create MessageTemplate', error: error.message });
    }
};

export const getMessageTemplate = async (req, res) => {
    const messagetemplateId = req.params.id;

    try {
        const messagetemplate = await messageTemplateService.getById(messagetemplateId);
        if (!messagetemplate) {
            return res.status(404).json({ message: 'MessageTemplate not found' });
        }
        res.json(messagetemplate);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch MessageTemplate', error: error.message });
    }
};

export const updateMessageTemplate = async (req, res) => {
    const messagetemplateId = req.params.id;
    const newData = req.body;

    try {
        const updatedMessageTemplate = await messageTemplateService.updateById(messagetemplateId, newData);
        res.json(updatedMessageTemplate);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update MessageTemplate', error: error.message });
    }
};

export const deleteMessageTemplate = async (req, res) => {
    const messagetemplateId = req.params.id;

    try {
        await messageTemplateService.deleteById(messagetemplateId);
        res.json({ message: 'MessageTemplate deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete MessageTemplate', error: error.message });
    }
};
