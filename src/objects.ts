import { Question } from "./interfaces/question";

/**
 * Make a blank question given an id, name, and type.
 */
export function makeBlankQuestion(
    id: number,
    name: string,
    type: "short_answer_question" | "multiple_choice_question",
): Question {
    return {
        id,
        name,
        body: "",
        type,
        options: [],
        expected: "",
        points: 1,
        published: false,
    };
}

/**
 * Check if an answer is correct for a given question.
 */
export function isCorrect(question: Question, answer: string): boolean {
    if (question.type === "short_answer_question") {
        return question.expected.trim().toLowerCase() === answer.trim().toLowerCase();
    } else {
        return question.expected === answer;
    }
}

/**
 * Check if an answer is valid for a given question.
 */
export function isValid(question: Question, answer: string): boolean {
    if (question.type === "short_answer_question") {
        return true;
    }
    return question.options.includes(answer);
}

/**
 * Convert a question into its short form string.
 */
export function toShortForm(question: Question): string {
    return `${question.id}: ${question.name.substring(0, 10)}`;
}

/**
 * Convert a question into a Markdown string.
 */
export function toMarkdown(question: Question): string {
    const header = `# ${question.name}`;
    if (question.type === "short_answer_question") {
        return `${header}\n${question.body}`;
    } else {
        const options = question.options.map((opt: string): string => `- ${opt}`).join("\n");
        return `${header}\n${question.body}\n${options}`;
    }
}

/**
 * Create a new version of the question with a different name.
 */
export function renameQuestion(question: Question, newName: string): Question {
    return { ...question, name: newName };
}

/**
 * Publish/unpublish a question (toggle published).
 */
export function publishQuestion(question: Question): Question {
    return { ...question, published: !question.published };
}

/**
 * Duplicate a question, copying all details but changing id and name.
 */
export function duplicateQuestion(newId: number, question: Question): Question {
    return {
        ...question,
        id: newId,
        name: `Copy of ${question.name}`,
        published: false,
    };
}

/**
 * Add an option to a multiple choice question.
 */
export function addOption(question: Question, option: string): Question {
    if (question.type === "multiple_choice_question") {
        return {
            ...question,
            options: [...question.options, option],
        };
    }
    return { ...question };
}

/**
 * Merge two questions into one.
 * - Body and expected come from contentQuestion
 * - Points come from pointsQuestion
 */
export function mergeQuestion(
    id: number,
    name: string,
    contentQuestion: Question,
    pointsQuestion: Question,
): Question {
    return {
        id,
        name,
        body: contentQuestion.body,
        type: contentQuestion.type,
        options: [...contentQuestion.options],
        expected: contentQuestion.expected,
        points: pointsQuestion.points,
        published: false,
    };
}
