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
/***
 * A representation of a students' answer in a quizzing game
 */
export interface Answer {
    /** The ID of the question being answered. */
    questionId: number;
    /** The text that the student entered for their answer. */
    text: string;
    /** Whether or not the student has submitted this answer. */
    submitted: boolean;
    /** Whether or not the students' answer matched the expected. */
    correct: boolean;
}
