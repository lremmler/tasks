import { Question, QuestionType } from "./interfaces/question";

/**
 * Create a new blank question.
 */
export function makeBlankQuestion(
    id: number,
    name: string,
    type: QuestionType
): Question {
    return {
        id,
        name,
        type,
        body: "",
        expected: "",
        options: [] as string[],
        points: 1,
        published: false,
    };
}

/**
 * Return whether `answer` matches expected, ignoring whitespace/case.
 */
export function isCorrect(question: Question, answer: string): boolean {
    const cleanAnswer: string = answer.trim().toLowerCase();
    const cleanExpected: string = question.expected.trim().toLowerCase();
    return cleanAnswer === cleanExpected;
}

/**
 * Return whether `answer` is valid for the question.
 */
export function isValid(question: Question, answer: string): boolean {
    if (question.type === "short_answer_question") {
        return true;
    }
    return question.options.includes(answer);
}

/**
 * Short string representation of a question.
 */
export function toShortForm(question: Question): string {
    const shortName: string = question.name.substring(0, 10);
    return `${question.id}: ${shortName}`;
}

/**
 * Markdown representation of a question.
 */
export function toMarkdown(question: Question): string {
    let result: string = `# ${question.name}\n${question.body}`;
    if (question.type === "multiple_choice_question") {
        const lines: string[] = question.options.map(
            (opt: string): string => `- ${opt}`
        );
        result += `\n${lines.join("\n")}`;
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
        options: [...question.options],
    };
}

/**
 * Return a copy of the question with published flipped.
 */
export function publishQuestion(question: Question): Question {
    return {
        ...question,
        published: !question.published,
        options: [...question.options],
    };
}

/**
 * Duplicate a question with a new id and reset published.
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
 * Add a new option to a question.
 */
export function addOption(question: Question, newOption: string): Question {
    const newOptions: string[] = [...question.options, newOption];
    return {
        ...question,
        options: newOptions,
    };
}

/**
 * Merge two questions into one.
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
        published: false,
    };
}
