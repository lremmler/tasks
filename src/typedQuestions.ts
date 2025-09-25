import { Question } from "./interfaces/question";
import rawQuestions from "./questions.json";

// Strongly typed array of questions
const typedQuestions: Question[] = rawQuestions as Question[];

export default typedQuestions;
