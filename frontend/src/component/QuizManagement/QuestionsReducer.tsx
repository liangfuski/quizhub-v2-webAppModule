import { Question, FieldErrors } from "@/utils/type"
import { isEmpty } from "lodash";
import { randomBytes } from "crypto";

export interface ValidableQuestion extends Question {
    error?: FieldErrors
}
export type questionAction = 
    | { type: "create", quizId: string} 
    | { type: "edit"; question: ValidableQuestion }
    | { type: "delete"; questionId: ValidableQuestion["_id"] }

const generateHexString = (length: number): string => {
    const bytes = randomBytes(Math.ceil(length / 2)); // Generate random bytes
    return bytes.toString('hex').slice(0, length); // Convert to hex and slice to desired length
};

export function questionsReducer(questions: ValidableQuestion[], action: questionAction): ValidableQuestion[]{
    switch (action.type){
        case 'create': {
            const newBlankQuestion = {
                _id: generateHexString(24),
                quizId: action.quizId,
                prompt: "",
                options: ["", "","", ""],
                answer: 0
            } 
            return [newBlankQuestion, ...questions ]
        };
        case 'edit': {

            const error = validateField(action.question);
            const updatedQuestion = {...action.question};
            if(error) updatedQuestion.error = error

            return questions.map(q => q._id === action.question._id ? updatedQuestion : q)
        };
        case 'delete': {
            console.log("delete is calling")
            console.log(questions.filter(q => q._id !== action!.questionId))
            return questions.filter(q => q._id !== action!.questionId)
        }
        default:
            return questions
    }
}

function validateField(q: ValidableQuestion): FieldErrors|undefined{
    let error = q.error || {}

    if(!q.prompt) {
        error = {...error, prompt: "Please provide a question!"}
    } else {
        delete error.question
    }

    for(let i = 0; i < q.options.length; i++){
        if(!q.options[i]){
            error = {...error, [`option_${i+1}`]: "Option cannot be empty"}
        } else {
            delete error[`option_${i+1}`]
        }
    }
        

    return isEmpty(error) ? undefined : error; 
}