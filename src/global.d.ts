// This file declares JSON imports as strongly typed arrays of Questions
import { Question } from "./interfaces/question";

declare module "*.json" {
    const value: Question[];
    export default value;
}
