import { Question, QuestionType } from "./interfaces/question";

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
        options: [],
        points: 1,
        published: false,
    };
}

export function isCorrect(question: Question, answer: string): boolean {
    const cleanAnswer: string = answer.trim().toLowerCase();
    const cleanExpected: string = question.expected.trim().toLowerCase();
    return cleanAnswer === cleanExpected;
}

export function isValid(question: Question, answer: string): boolean {
    if (question.type === "short_answer_question") {
        return true;
    }
    return question.options.includes(answer);
}

export function toShortForm(question: Question): string {
    return `${question.id}: ${question.name.substring(0, 10)}`;
}

export function toMarkdown(question: Question): string {
    let markdown: string = `# ${question.name}\n${question.body}`;
    if (question.type === "multiple_choice_question") {
        const optionsCopy: string[] = [...question.options];
        for (const option of optionsCopy) {
            markdown += `\n- ${option}`;
        }
    }
    return markdown;
}

export function renameQuestion(question: Question, newName: string): Question {
    const optionsCopy: string[] = [...question.options];
    return { ...question, name: newName, options: optionsCopy };
}

export function publishQuestion(question: Question): Question {
    const optionsCopy: string[] = [...question.options];
    return { ...question, published: !question.published, options: optionsCopy };
}

export function duplicateQuestion(id: number, oldQuestion: Question): Question {
    const optionsCopy: string[] = [...oldQuestion.options];
    return { ...oldQuestion, id, name: `Copy of ${oldQuestion.name}`, published: false, options: optionsCopy };
}

export function addOption(question: Question, newOption: string): Question {
    const optionsCopy: string[] = [...question.options, newOption];
    return { ...question, options: optionsCopy };
}

export function mergeQuestion(
    id: number,
    name: string,
    contentQuestion: Question,
    { points }: { points: number }
): Question {
    const optionsCopy: string[] = [...contentQuestion.options];
    return {
        id,
        name,
        type: contentQuestion.type,
        body: contentQuestion.body,
        expected: contentQuestion.expected,
        options: optionsCopy,
        points,
        published: false,
    };
}
