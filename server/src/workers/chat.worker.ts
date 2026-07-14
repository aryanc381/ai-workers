import axios from 'axios';
import { env } from '../env.js';

type ChatWorkerResult = {
    question: string,
    answer: string
}

export async function chatWorker(question: string): Promise<ChatWorkerResult> {
    const response = await axios.post(
        `${env.LLM_API_URL}`, 
        {
            model: env.LLM_MODEL,
            messages: [
            {
                role: 'system',
                content: 'You are a helpful assistant'
            },
            {
                role: 'user',
                content: question
            }
        ],
        stream: false,
        },
        {
            headers: {
                Authorization: `Bearer ${env.LLM_API_KEY}`
            }
        }
    );
    const answer = response.data?.choices?.[0]?.message?.content?.trim();
    if(!answer) {
        return {question: question, answer: 'LLM returned an empty response.' } 
    }
    return {
        question,
        answer
    }
}