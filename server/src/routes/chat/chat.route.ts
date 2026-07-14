import express from 'express';
import zod from 'zod';
import { validate } from '../../middleware/zodValidator.middleware.js';
import { chatService } from '../../services/chat.service.js';

const router = express.Router();

const chatSchema = zod.object({
    question: zod.string().min(1, "Question cannot be empty.")
});

router.get('/health', async (req, res) => {
    return res.json({ status: 200, msg: 'Chat endpoint is up and healthy.' });
});

router.post('/', validate(chatSchema), async (req, res) => {
    try {
        const { question } = req.body;
        const response = await chatService(question);
        return res.json({ status: 200, data: response });
    } catch (err) {
        return res.json({ status: 500, msg: "Internal Server Error." });
    }
});

export default router;
