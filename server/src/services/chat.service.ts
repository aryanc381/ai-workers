import { chatWorker } from "../workers/chat.worker.js";

export async function chatService(question: string) {
    const response = await chatWorker(question);
    return response;
}
