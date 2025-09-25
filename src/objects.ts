import { Question, QuestionType } from "./interfaces/question";

/**
 * Create a new blank question with the given `id`, `name`, and `type. The `body` and
 * `expected` should be empty strings, the `options` should be an empty list, the `points`
 * should default to 1, and `published` should default to false.
 */
export function makeBlankQuestion(
    id: number,
    name: string,
    type: QuestionType
): Question {
    // Construct and return a new question object with default values
    const blankQuestion: Question = {
        id: id,
        name: name,
        type: type,
        body: "", // Empty body by default
        expected: "", // Empty expected answer by default
        options: [], // Start with empty options array
        points: 1, // Default to 1 point
        published: false // Initially unpublished
    };
    return blankQuestion;
}

/**
 * Consumes a question and a potential `answer`, and returns whether or not
 * the `answer` is correct. You should check that the `answer` is equal to
 * the `expected`, ignoring capitalization and trimming any whitespace.
 *
 * HINT: Look up the `trim` and `toLowerCase` functions.
 */
export function isCorrect(question: Question, answer: string): boolean {
    // Normalize both strings for case-insensitive comparison
    const processedUserAnswer = answer.trim().toLowerCase();
    const processedCorrectAnswer = question.expected.trim().toLowerCase();
    
    // Compare the normalized strings
    return processedUserAnswer === processedCorrectAnswer;
}

/**
 * Consumes a question and a potential `answer`, and returns whether or not
 * the `answer` is valid (but not necessarily correct). For a `short_answer_question`,
 * any answer is valid. But for a `multiple_choice_question`, the `answer` must
 * be exactly one of the options.
 */
export function isValid(question: Question, answer: string): boolean {
    // Short answer questions accept any response
    if (question.type === "short_answer_question") {
        return true;
    }
    // Multiple choice requires the answer to be in the options list
    return question.options.includes(answer);
}

/**
 * Consumes a question and produces a string representation combining the
 * `id` and first 10 characters of the `name`. The two strings should be
 * separated by ": ". So for example, the question with id 9 and the
 * name "My First Question" would become "9: My First Q".
 */
export function toShortForm(question: Question): string {
    // Extract first 10 characters of the name
    const abbreviatedName = question.name.slice(0, 10);
    // Combine ID and abbreviated name
    return `${question.id}: ${abbreviatedName}`;
}

/**
 * Consumes a question and returns a formatted string representation as follows:
 *  - The first line should be a hash sign, a space, and then the `name`
 *  - The second line should be the `body`
 *  - If the question is a `multiple_choice_question`, then the following lines
 *      need to show each option on its line, preceded by a dash and space.
 *
 * The example below might help, but don't include the border!
 * ----------Example-------------
 * |# Name                      |
 * |The body goes here!         |
 * |- Option 1                  |
 * |- Option 2                  |
 * |- Option 3                  |
 * ------------------------------
 * Check the unit tests for more examples of what this looks like!
 */
export function toMarkdown(question: Question): string {
    // Start with name and body
    let markdownOutput = `# ${question.name}\n${question.body}`;
    
    // Add options if it's a multiple choice question
    if (question.type === "multiple_choice_question") {
        const formattedOptions = question.options
            .map(option => `- ${option}`)
            .join("\n");
        markdownOutput += `\n${formattedOptions}`;
    }
    
    return markdownOutput;
}

/**
 * Return a new version of the given question, except the name should now be
 * `newName`.
 */
export function renameQuestion(question: Question, newName: string): Question {
    // Create new object with updated name (immutable update)
    const updatedQuestion = { 
        ...question, 
        name: newName 
    };
    return updatedQuestion;
}

/**
 * Return a new version of the given question, except the `published` field
 * should be inverted. If the question was not published, now it should be
 * published; if it was published, now it should be not published.
 */
export function publishQuestion(question: Question): Question {
    // Toggle published status (immutable update)
    const questionWithToggledPublish = { 
        ...question, 
        published: !question.published 
    };
    return questionWithToggledPublish;
}

/**
 * Create a new question based on the old question, copying over its `body`, `type`,
 * `options`, `expected`, and `points` without changes. The `name` should be copied
 * over as "Copy of ORIGINAL NAME" (e.g., so "Question 1" would become "Copy of Question 1").
 * The `published` field should be reset to false.
 */
export function duplicateQuestion(id: number, oldQuestion: Question): Question {
    // Create a duplicate with new ID and modified name
    const questionDuplicate: Question = {
        id: id, // New ID provided as parameter
        name: `Copy of ${oldQuestion.name}`, // Prefix with "Copy of"
        body: oldQuestion.body,
        type: oldQuestion.type,
        options: [...oldQuestion.options], // Create new array reference
        expected: oldQuestion.expected,
        points: oldQuestion.points,
        published: false, // Always unpublished when duplicated
    };
    return questionDuplicate;
}

/**
 * Return a new version of the given question, with the `newOption` added to
 * the list of existing `options`. Remember that the new Question MUST have
 * its own separate copy of the `options` list, rather than the same reference
 * to the original question's list!
 * Check out the subsection about "Nested Fields" for more information.
 */
export function addOption(question: Question, newOption: string): Question {
    // Create new question with extended options array
    const questionWithNewOption = { 
        ...question, 
        options: [...question.options, newOption] // New array with added option
    };
    return questionWithNewOption;
}

/**
 * Consumes an id, name, and two questions, and produces a new question.
 * The new question will use the `body`, `type`, `options`, and `expected` of the
 * `contentQuestion`. The second question will provide the `points`.
 * The `published` status should be set to false.
 * Notice that the second Question is provided as just an object with a `points`
 * field; but the function call would be the same as if it were a `Question` type!
 */
export function mergeQuestion(
    id: number,
    name: string,
    contentQuestion: Question,
    { points }: { points: number }
): Question {
    // Merge content from contentQuestion with points from second parameter
    const mergedQuestionResult: Question = {
        id: id,
        name: name,
        body: contentQuestion.body,
        type: contentQuestion.type,
        options: [...contentQuestion.options], // Copy options array
        expected: contentQuestion.expected,
        points: points, // Points from the points parameter
        published: false, // Always unpublished when merged
    };
    return mergedQuestionResult;
}
