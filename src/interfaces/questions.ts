export type QuestionType = "short_answer_question" | "multiple_choice_question";

export interface Question {
    id: number;
    name: string;
    type: QuestionType;
    body: string;
    expected: string;
    options: string[];
    points: number;
    published: boolean;
}
