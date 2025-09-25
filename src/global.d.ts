import type { Question } from "./interfaces/question";

declare module "*.json" {
    const value: Question[];
    export default value;
}
