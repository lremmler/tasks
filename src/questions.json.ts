import { Question } from "./interfaces/question";
import rawQuestions from "./questions.json";

// Explicitly cast JSON to Question[]
export const questions: Question[] = rawQuestions as Question[];
