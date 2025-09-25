import { Question, QuestionType } from "./interfaces/question";

/**
 * Create a new blank question
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
 * Check if an answer is correct (ignoring case and whitespace)
 */
export function isCorrect(question: Question, answer: string): boolean {
    return (
        answer.trim().toLowerCase() === question.expected.trim().toLowerCase()
    );
}

/**
 * Check if an answer is valid for a question
 */
export function isValid(question: Question, answer: string): boolean {
    return question.type === "short_answer_question"
        ? true
        : question.options.includes(answer);
}

/**
 * Short form of a question
 */
export function toShortForm(question: Question): string {
    return `${question.id}: ${question.name.substring(0, 10)}`;
}

/**
 * Markdown representation of a question
 */
export function toMarkdown(question: Question): string {
    let result = `# ${question.name}\n${question.body}`;
    if (question.type === "multiple_choice_question") {
        result += question.options.map((opt: string) => `\n- ${opt}`).join("");
    }
    return result;
}

/**
 * Return a renamed version of the question
 */
export function renameQuestion(
    question: Question,
    newName: string,
): Question {
    return { ...question, name: newName, options: [...question.options] };
}

/**
 * Return a version with published inverted
 */
export function publishQuestion(question: Question): Question {
    return { ...question, published: !question.published, options: [...question.options] };
}

/**
 * Duplicate a question with a new id
 */
export function duplicateQuestion(id: number, oldQuestion: Question): Question {
    return {
        ...oldQuestion,
        id,
        name: `Copy of ${oldQuestion.name}`,
        published: false,
        options: [...oldQuestion.options],
    };
}

/**
 * Add an option to a question
 */
export function addOption(question: Question, newOption: string): Question {
    return { ...question, options: [...question.options, newOption] };
}

/**
 * Merge two questions into a new one
 */
export function mergeQuestion(
    id: number,
    name: string,
    contentQuestion: Question,
    { points }: { points: number },
): Question {
    return {
        id,
        name,
        type: contentQuestion.type,
        body: contentQuestion.body,
        expected: contentQuestion.expected,
        options: [...contentQuestion.options],
        points,
        published: false,
    };
}
