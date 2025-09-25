import { Question } from "./interfaces/question";

export const questions: Question[] = [
    {
        id: 1,
        name: "Addition Problem",
        type: "short_answer_question",
        body: "What is 2 + 2?",
        expected: "4",
        options: [],
        points: 1,
        published: false
    },
    {
        id: 2,
        name: "Color Question",
        type: "multiple_choice_question",
        body: "What is the color of the sky?",
        expected: "Blue",
        options: ["Blue", "Red", "Green", "Yellow"],
        points: 2,
        published: true
    }
];
