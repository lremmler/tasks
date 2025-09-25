import type { Question } from "./interfaces/question";

declare global {
    interface Window {
        questions: Question[];
    }
}

export {};
