// interfaces/answer.ts

/**
 * Represents an answer to a question
 */
export interface Answer {
    /** The ID of the question this answer belongs to */
    questionId: number;
    /** The text of the answer provided by the user */
    text: string;
    /** Whether the answer has been submitted */
    submitted: boolean;
    /** Whether the answer is correct */
    correct: boolean;
}
