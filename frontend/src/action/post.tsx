"use server"
import { Quiz, ActionValidationState, Question } from "@/utils/type";
import { redirect } from "next/navigation";
import { isEmpty } from "lodash";
import { postEditQuiz, postQuizQuestion } from "@/api/route";
import { revalidatePath } from "next/cache";

export async function editQuizInfo(prevState: ActionValidationState,formData: FormData) {
    const title = formData.get("title");
    const desc = formData.get("description");

    // return Object.assign(prevState, {title, desc})
    return { ...prevState, title, description: desc };
}

 
function transformInput(input: { [k: string]: FormDataEntryValue; }): Question[] {
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
        question.prompt = input[key] as string;
      } else if (type.startsWith('option')) {
        const optionIndex = parseInt(match[3]) - 1; // Convert option number to index
        question.options[optionIndex] = input[key] as string;
      } else if (type === 'answer') {
        question.answer = parseInt(input[key] as string);
      }
    }
    
    for(const ele of questions){
        delete ele._id
    }

    return questions
}


/* eslint-disable @typescript-eslint/no-unused-vars */
export async function editQuiz(quizInfo: Quiz,  prevState: ActionValidationState, formData: FormData): Promise<ActionValidationState>{

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    
    const rawData = Object.fromEntries(formData.entries());

    const newQuestions = transformInput(rawData);

    const errors = {
        fieldErrors: {},
        formErrors: []
    }

    if(!title) {
        errors.fieldErrors = {...errors.fieldErrors, title: "Title is required"};
    }
    
    if(!description) {
        errors.fieldErrors = {...errors.fieldErrors, description: "Description is required"};
    }

    if(
      !errors || !errors.fieldErrors || isEmpty(errors.fieldErrors)
    ) {
        
        try {
          const [errObj1, errObj2] = await Promise.all([
            postEditQuiz({
              quizId: quizInfo._id, 
              quizInfo: {author: quizInfo.author, title , description }
            }),
            postQuizQuestion({
              quizId: quizInfo._id || "",
              questions: newQuestions
            })
          ])

          const err = {...errObj1, ...errObj2}

          if (!isEmpty(err)){
            throw Error(errObj1.error + "" + errObj2.error);
          }

          errors.fieldErrors = [];
        } catch (e){
          console.log(e)
          errors.fieldErrors = ["Form Submission failed ! Please try again later !"]
        }
        revalidatePath("/manage-quizes");
        revalidatePath(`/manage-quizes/${quizInfo._id}`);
        void redirect("/manage-quizes");

    }

    return {errors}
}
/* eslint-disable @typescript-eslint/no-unused-vars */