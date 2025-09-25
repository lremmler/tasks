import { Question } from "./interfaces/question";
import { questionsJson } from "./questions.json";

// Strong typing: always a Question[]
export const typedQuestions: Question[] = [...questionsJson];
