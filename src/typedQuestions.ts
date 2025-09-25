import raw from "./data/questions.json";
import { Question } from "./interfaces/question";

interface QuestionData {
    BLANK_QUESTIONS: Question[];
    SIMPLE_QUESTIONS: Question[];
}

const data = raw as unknown as QuestionData;

export const BLANK_QUESTIONS: Question[] = data.BLANK_QUESTIONS;
export const SIMPLE_QUESTIONS: Question[] = data.SIMPLE_QUESTIONS;
