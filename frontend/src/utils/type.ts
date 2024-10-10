export interface Quiz {
    "_id"?: string,
    "title": string,
    "description": string,
    "author": string,
    "__v" ?: number 
}


export interface Question {
    "_id"?: string,
    "quizId"?: string,
    "prompt": string,
    "options": string[],
    "answer": number
}

export type ActionValidationState = {
    errors?: ActionErrors;
}
  
export type ActionErrors = {
fieldErrors?: FieldErrors;
formErrors?: string[];
}

export type FieldErrors = { 
[x: string]: string | undefined; 
[x: number]: string | undefined; 
[x: symbol]: string | undefined; 
}
