"use client"
import { TextField } from "@mui/material";
import { Question, Quiz, ActionValidationState } from "@/utils/type";
import Box from '@mui/material/Box';
import { useFormState } from "react-dom";
import { useState, useReducer } from "react";
import { editQuiz } from "@/action/post";

type questionAction = 
    | { type: "create"; question: Question } 
    | { type: "edit"; question: Question }
    | { type: "delete"; questionId: Question["id"] } 

function questionsReducer(questions: Question[], action: questionAction): Question[]{
    switch (action.type){
        case 'create': {
            return [...questions, {
                ...action.question
            }]
        };
        case 'edit': {
            return questions.map(q => q.id === action.question.id ? {...action.question} : q)
        };
        case 'delete': {
            return questions.filter(q => q.id !== action!.questionId)
        }
        default:
            return questions
    }
}


export default function QuizManagementForm({quizInfo, questions}: {quizInfo: Quiz, questions: Question[]}){


    const [formState , formAction] = useFormState<ActionValidationState, FormData>(editQuiz.bind(null, quizInfo), {
        errors: {
            fieldErrors: {},
            formErrors: []
        }
    });
     
    const [enteredQuizInfoValues, setEnteredQuizInfoValues] = useState<Quiz>(quizInfo);
    const [questionList, dispatch] = useReducer(questionsReducer, questions);

    function handleQuizInfoInputChange(identifier: string, value: string): void {
        setEnteredQuizInfoValues((preValues) =>({
            ...preValues,
            [identifier]: value
        }))
    };

    function checkFieldErrorMessage(fieldName: string): string|undefined {
        return formState.errors!.fieldErrors![fieldName]
    };

    return (
            <Box 
                component="form"
                autoComplete="off" 
                action={formAction}>

                <TextField 
                    id="quiz-title" 
                    label="Quiz Title" 
                    value={enteredQuizInfoValues.title}
                    name="title"
                    onChange={(event) => handleQuizInfoInputChange("title", event.target.value)} 
                    variant="standard"
                    helperText={checkFieldErrorMessage("title")}
                    error={!!checkFieldErrorMessage("title")} 
                    fullWidth={true}/>
                
                <TextField 
                    id="quiz-description" 
                    label="Description" 
                    value={enteredQuizInfoValues.description} 
                    onChange={(event) => handleQuizInfoInputChange("description", event.target.value)} 
                    name="description"
                    multiline={true} 
                    helperText={checkFieldErrorMessage("description")}
                    error={!!checkFieldErrorMessage("description")} 
                    minRows={8}
                    sx={{
                        mt: 2,
                        width:{
                            xs: "100%",
                            md: "50%"
                        }}}/>

                <button type="submit">Create Post</button>

            </Box>
    )
}