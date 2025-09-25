import { Question, QuestionType } from "./interfaces/question";

/**
 * Create a new blank question with the given `id`, `name`, and `type`.
 */
export function makeBlankQuestion(
    id: number,
    name: string,
    type: QuestionType
): Question {
    const question: Question = {
        id,
        name,
        type,
        body: "",
        expected: "",
        options: [],
        points: 1,
        published: false
    };
    return question;
}

/**
 * Check if an answer is correct (ignoring case + trimming whitespace).
 */
export function isCorrect(question: Question, answer: string): boolean {
    const cleanAnswer: string = answer.trim().toLowerCase();
    const cleanExpected: string = question.expected.trim().toLowerCase();
    return cleanAnswer === cleanExpected;
}

/**
 * Validate an answer: any string for short_answer_question, or must match
 * one of the options for multiple_choice_question.
 */
export function isValid(question: Question, answer: string): boolean {
    if (question.type === "short_answer_question") {
        return true;
    }
    return question.options.includes(answer);
}

/**
 * Short form: "id: first10charsOfName".
 */
export function toShortForm(question: Question): string {
    const shortName: string = question.name.substring(0, 10);
    return `${question.id}: ${shortName}`;
}

/**
 * Markdown format for a question.
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
 * Rename a question (new object).
 */
export function renameQuestion(question: Question, newName: string): Question {
    return {
        ...question,
        name: newName,
        options: [...question.options]
    };
}

/**
 * Invert published status.
 */
export function publishQuestion(question: Question): Question {
    return {
        ...question,
        options: [...question.options],
        published: !question.published
    };
}

/**
 * Duplicate a question with new id, name prefixed by "Copy of", and reset published.
 */
export function duplicateQuestion(id: number, oldQuestion: Question): Question {
    return {
        ...oldQuestion,
        id,
        name: `Copy of ${oldQuestion.name}`,
        options: [...oldQuestion.options],
        published: false
    };
}

/**
 * Add a new option (copy options array).
 */
export function addOption(question: Question, newOption: string): Question {
    return {
        ...question,
        options: [...question.options, newOption]
    };
}

/**
 * Merge body/type/options/expected from contentQuestion with points from other.
 */
export function mergeQuestion(
    id: number,
    name: string,
    contentQuestion: Question,
    { points }: { points: number }
): Question {
    return {
        id,
        name,
        type: contentQuestion.type,
        body: contentQuestion.body,
        expected: contentQuestion.expected,
        options: [...contentQuestion.options],
        points,
        published: false
    };
}
