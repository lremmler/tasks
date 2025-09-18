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
 * Check if an answer is correct.
 */
export function isCorrect(question: Question, answer: string): boolean {
    const normalized: string = answer.trim().toLowerCase();
    const expected: string = question.expected.trim().toLowerCase();
    return normalized === expected;
}

/**
 * Check if an answer is valid.
 */
export function isValid(question: Question, answer: string): boolean {
    if (question.type === "short_answer_question") {
        return true;
    }
    return question.options.includes(answer);
}

/**
 * Return a short form string "id: first 10 chars of name".
 */
export function toShortForm(question: Question): string {
    return `${question.id}: ${question.name.slice(0, 10)}`;
}

/**
 * Markdown representation of a question.
 */
export function toMarkdown(question: Question): string {
    let result: string = `# ${question.name}\n${question.body}`;
    if (question.type === "multiple_choice_question") {
        const opts: string = question.options.map((o: string) => `- ${o}`).join("\n");
        result += `\n${opts}`;
    }
    return result;
}

/**
 * Rename a question.
 */
export function renameQuestion(question: Question, newName: string): Question {
    return { ...question, name: newName };
}

/**
 * Toggle publish status.
 */
export function publishQuestion(question: Question): Question {
    return { ...question, published: !question.published };
}

/**
 * Duplicate a question with a new id and reset published to false.
 */
export function duplicateQuestion(newId: number, question: Question): Question {
    return {
        ...question,
        id: newId,
        name: `Copy of ${question.name}`,
        published: false,
        options: [...question.options],
    };
}

/**
 * Add an option to a question.
 */
export function addOption(question: Question, option: string): Question {
    return { ...question, options: [...question.options, option] };
}

/**
 * Merge two questions.
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
