export interface quiz {
    "_id"?: string,
    "title": string,
    "description": string,
    "author": string,
    "__v" ?: number 
}


export interface question {
    "id"?: string,
    "quizId": string,
    "prompt": string,
    "options": string[],
    "answer": number
}