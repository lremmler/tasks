import { Question } from "./interfaces/question";
import questions from "./questions.json";

// Strongly type the imported questions
const typedQuestions: Question[] = questions;

export default typedQuestions;
