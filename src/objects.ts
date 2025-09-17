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
 * Check if an answer is correct
 */
export function isCorrect(question: Question, answer: string): boolean {
    return answer.trim().toLowerCase() === question.expected.trim().toLowerCase();
}

/**
 * Check if an answer is valid
 */
export function isValid(question: Question, answer: string): boolean {
    if (question.type === QuestionType.short_answer_question) {
        return true;
    }
    if (question.type === QuestionType.multiple_choice_question) {
        return question.options.includes(answer);
    }
    return false;
}

/**
 * Short form: "id: first 10 chars of name"
 */
export function toShortForm(question: Question): string {
    return `${question.id}: ${question.name.substring(0, 10)}`;
}

/**
 * Markdown representation
 */
export function toMarkdown(question: Question): string {
    let result = `# ${question.name}\n${question.body}`;
    if (question.type === QuestionType.multiple_choice_question) {
        result += "\n" + question.options.map(opt => `- ${opt}`).join("\n");
    }
    return result;
}

/**
 * Rename question
 */
export function renameQuestion(question: Question, newName: string): Question {
    return { ...question, name: newName };
}

/**
 * Toggle publish status
 */
export function publishQuestion(question: Question): Question {
    return { ...question, published: !question.published };
}

/**
 * Duplicate a question
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
 * Add option to a question
 */
export function addOption(question: Question, newOption: string): Question {
    return { ...question, options: [...question.options, newOption] };
}

/**
 * Merge questions
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
        options: [...contentQuestion.options],
    };
}
