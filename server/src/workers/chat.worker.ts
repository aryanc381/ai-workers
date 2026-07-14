import axios from 'axios';
import { env } from '../env.js';

type ChatWorkerResult = {
    question: string,
    answer: string
}

export async function chatWorker(question: string): Promise<ChatWorkerResult> {
    const response = await axios.post(
        env.LLM_API_URL!,
        {
            model: env.LLM_MODEL!,
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
                Authorization: `Bearer ${env.LLM_API_KEY!}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }
    );
    const message = response.data?.choices?.[0]?.message;
    const content = message?.content;
    const answer =
        typeof content === "string"
            ? content.trim()
            : Array.isArray(content)
                ? content
                    .map((part) => (typeof part?.text === "string" ? part.text : ""))
                    .join("")
                    .trim()
                : typeof message?.reasoning_content === "string"
                    ? message.reasoning_content.trim()
                    : typeof response.data?.choices?.[0]?.text === "string"
                        ? response.data?.choices?.[0]?.text.trim()
                        : "";
    if(!answer) {
        return {question: question, answer: 'LLM returned an empty response.' } 
    }
    return {
        question,
        answer
    }
}
