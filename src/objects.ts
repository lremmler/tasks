import { Question, QuestionType } from "./interfaces/question";

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

export function isCorrect(question: Question, answer: string): boolean {
    return answer.trim().toLowerCase() === question.expected.trim().toLowerCase();
}

export function isValid(question: Question, answer: string): boolean {
    return question.type === "short_answer_question" || question.options.includes(answer);
}

export function toShortForm(question: Question): string {
    return `${question.id}: ${question.name.substring(0, 10)}`;
}

export function toMarkdown(question: Question): string {
    let result = `# ${question.name}\n${question.body}`;
    if (question.type === "multiple_choice_question") {
        question.options.forEach(option => result += `\n- ${option}`);
    }
    return result;
}

export function renameQuestion(question: Question, newName: string): Question {
    return { ...question, name: newName, options: [...question.options] };
}

export function publishQuestion(question: Question): Question {
    return { ...question, published: !question.published, options: [...question.options] };
}

export function duplicateQuestion(id: number, oldQuestion: Question): Question {
    return { ...oldQuestion, id, name: `Copy of ${oldQuestion.name}`, published: false, options: [...oldQuestion.options] };
}

export function addOption(question: Question, newOption: string): Question {
    return { ...question, options: [...question.options, newOption] };
}

export function mergeQuestion(
    id: number,
    name: string,
    contentQuestion: Question,
    { points }: { points: number },
): Question {
    return { ...contentQuestion, id, name, points, published: false, options: [...contentQuestion.options] };
}
