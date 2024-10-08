"use server"
import { getErrorsForField } from "@/utils/format-error";
import { Quiz, ActionValidationState } from "@/utils/type";

export async function editQuizInfo(prevState: any,formData: FormData) {
    const title = formData.get("title");
    const desc = formData.get("description");

    console.log("previous title ::: ", prevState.title)
    console.log("new title  ::: ", title)
    // return Object.assign(prevState, {title, desc})
    return { ...prevState, title, description: desc };
}


export async function editQuiz(quizInfo: Quiz,  prevState: ActionValidationState, formData: FormData): Promise<ActionValidationState>{

    const title = formData.get("title");
    const description = formData.get("description")

    let errors = {
        fieldErrors: {},
        formErrors: []
    }

    if(!title) {
        errors.fieldErrors = {...errors.fieldErrors, title: "Title is required"}
    }
    
    if(!description) {
        errors.fieldErrors = {...errors.fieldErrors, description: "Description is required"}
    }
    

    console.log({...quizInfo, title, description})
    console.log(errors)

    return {errors}
}
