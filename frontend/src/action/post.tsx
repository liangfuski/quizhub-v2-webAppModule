"use server"
import { getErrorsForField } from "@/utils/format-error";
import { Quiz, ActionValidationState, Question } from "@/utils/type";

export async function editQuizInfo(prevState: any,formData: FormData) {
    const title = formData.get("title");
    const desc = formData.get("description");

    console.log("previous title ::: ", prevState.title)
    console.log("new title  ::: ", title)
    // return Object.assign(prevState, {title, desc})
    return { ...prevState, title, description: desc };
}

 
function transformInput(input: any): Question[] {
    const questions: Question[] = [];
    const questionKeys = Object.keys(input);
  
    // Iterate through the keys to group data by question ID
    for (const key of questionKeys) {
      const match = key.match(/^(.+?)_(prompt|option_(\d+)|answer)$/);
      if (!match) continue;
  
      const _id = match[1]; // Extract question ID
      const type = match[2]; // Determine if it's prompt, option, or answer
  
      // Find the question object by ID, or create it if it doesn't exist
      let question = questions.find(q => q._id === _id);
      if (!question) {
        question = { _id, prompt: '', options: [], answer: -1 };
        questions.push(question);
      }
  
      // Set the prompt, options, or answer based on the type
      if (type === 'prompt') {
        question.prompt = input[key];
      } else if (type.startsWith('option')) {
        const optionIndex = parseInt(match[3]) - 1; // Convert option number to index
        question.options[optionIndex] = input[key];
      } else if (type === 'answer') {
        question.answer = parseInt(input[key]);
      }
    }
    
    for(let ele of questions){
        delete ele._id
    }

    return questions
}

export async function editQuiz(quizId: string,  prevState: ActionValidationState, formData: FormData): Promise<ActionValidationState>{

    const title = formData.get("title");
    const description = formData.get("description");
    
    const rawData = Object.fromEntries(formData.entries());

    const newQuestions = transformInput(rawData);

    let errors = {
        fieldErrors: {},
        formErrors: []
    }

    if(!title) {
        errors.fieldErrors = {...errors.fieldErrors, title: "Title is required"};
    }
    
    if(!description) {
        errors.fieldErrors = {...errors.fieldErrors, description: "Description is required"};
    }

    return {errors}
}
