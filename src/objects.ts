import { Question, QuestionType } from "./interfaces/question";

/**
 * Create a new blank question with the given `id`, `name`, and `type`.
 */
export function makeBlankQuestion(
    id: number,
    name: string,
    type: QuestionType,
): Question {
    return {
        id,
        name,
        type,
        body: "",
        expected: "",
        options: [],
        points: 1,
        published: false,
    };
}

/**
 * Returns whether the `answer` is correct (case- and space-insensitive).
 */
export function isCorrect(question: Question, answer: string): boolean {
    const cleanAnswer: string = answer.trim().toLowerCase();
    const cleanExpected: string = question.expected.trim().toLowerCase();
    return cleanAnswer === cleanExpected;
}

/**
 * Returns whether the `answer` is valid for the given question type.
 */
export function isValid(question: Question, answer: string): boolean {
    if (question.type === "short_answer_question") {
        return true;
    }
    return question.options.includes(answer);
}

/**
 * Produces a short string representation of the question.
 */
export function toShortForm(question: Question): string {
    const shortName: string = question.name.substring(0, 10);
    return `${question.id}: ${shortName}`;
}

/**
 * Produces a Markdown representation of the question.
 */
export function toMarkdown(question: Question): string {
    let result: string = `# ${question.name}\n${question.body}`;
    if (question.type === "multiple_choice_question") {
        for (const option of question.options) {
            result += `\n- ${option}`;
        }
    }
    return result;
}

/**
 * Return a copy of the question with a new name.
 */
export function renameQuestion(question: Question, newName: string): Question {
    return {
        ...question,
        name: newName,
    };
}

/**
 * Return a copy of the question with the `published` field inverted.
 */
export function publishQuestion(question: Question): Question {
    return {
        ...question,
        published: !question.published,
    };
}

/**
 * Create a duplicate of the question, with a new `id`, updated name,
 * and `published` set to false.
 */
export function duplicateQuestion(id: number, oldQuestion: Question): Question {
    return {
        ...oldQuestion,
        id,
        name: `Copy of ${oldQuestion.name}`,
        published: false,
    };
}

/**
 * Return a copy of the question with an extra option added.
 */
export function addOption(question: Question, newOption: string): Question {
    return {
        ...question,
        options: [...question.options, newOption],
    };
}

/**
 * Merge two questions into a new one with a provided `id` and `name`.
 */
export function mergeQuestion(
    id: number,
    name: string,
    contentQuestion: Question,
    { points }: { points: number },
): Question {
    return {
        ...contentQuestion,
        id,
        name,
        points,
        published: false,
    };
}
