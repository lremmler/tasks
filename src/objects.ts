import { Question } from "./interfaces/question";

/**
 * Make a blank question with the given id, name, and type.
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
 * Return true if the provided answer is correct for the question.
 * Comparisons are case-insensitive for short_answer_question and strict for multiple_choice_question.
 */
export function isCorrect(question: Question, answer: string): boolean {
    const normalized = answer.trim().toLowerCase();
    if (question.type === "short_answer_question") {
        return question.expected.trim().toLowerCase() === normalized;
    }
    return question.expected === answer;
}

/**
 * Return true if the provided answer is a valid option for the question.
 * For short_answer_question, any answer is valid. For multiple_choice_question,
 * only an exact match of an option is valid.
 */
export function isValid(question: Question, answer: string): boolean {
    if (question.type === "short_answer_question") {
        return true;
    }
    return question.options.includes(answer);
}

/**
 * Return a short form string of the question: "id: first 10 chars of name".
 */
export function toShortForm(question: Question): string {
    return `${question.id}: ${question.name.slice(0, 10)}`;
}

/**
 * Return a markdown representation of the question.
 * Short answer questions are just "# name\nbody"
 * Multiple choice questions list options prefixed by "- ".
 */
export function toMarkdown(question: Question): string {
    const base = `# ${question.name}\n${question.body}`;
    if (question.type === "multiple_choice_question") {
        const options = question.options.map((opt) => `- ${opt}`).join("\n");
        return `${base}\n${options}`;
    }
    return base;
}

/**
 * Return a copy of the question with a new name.
 */
export function renameQuestion(question: Question, newName: string): Question {
    return { ...question, name: newName };
}

/**
 * Return a copy of the question with the published field toggled.
 */
export function publishQuestion(question: Question): Question {
    return { ...question, published: !question.published };
}

/**
 * Return a copy of the question with a new id, name prefixed with "Copy of ",
 * published set to false.
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
 * Return a copy of the question with a new option added to the end of options.
 */
export function addOption(question: Question, option: string): Question {
    return { ...question, options: [...question.options, option] };
}

/**
 * Merge two questions into a new question with the given id and name.
 * - body, type, options, expected come from contentQuestion
 * - points come from pointsQuestion
 * - published is always false
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

/**
 * Safe JSON parse utility to avoid linting issues with `unknown` error type.
 */
export function safeParse<T>(text: string): T | null {
    try {
        return JSON.parse(text) as T;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("JSON parse error:", err.message);
        } else {
            console.error("Unknown error during JSON parse");
        }
        return null;
    }
}
