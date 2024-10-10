"use client"
import { IconButton, TextField, Tooltip } from "@mui/material";
import { Quiz, ActionValidationState } from "@/utils/type";
import { ValidableQuestion } from "./QuestionsReducer";
import Box from '@mui/material/Box';
import { useFormState } from "react-dom";
import { useState, useReducer } from "react";
import { editQuiz } from "@/action/post";
import { questionsReducer } from "./QuestionsReducer"
import QuestionEditableCard from "./QuestionEditableCard";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';

export default function QuizManagementForm({quizInfo, questions}: {quizInfo: Quiz, questions: ValidableQuestion[]}){


    const [formState , formAction] = useFormState<ActionValidationState, FormData>(editQuiz.bind(null, quizInfo._id || ""), {
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

    function checkQuestionErrorExist(questions: ValidableQuestion[]): boolean{
        return questions.some(ele => !!ele.error)
    }

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
                    multiline
                    sx={{
                        "& .MuiInputBase-input": {
                            fontSize: {
                                xs:"1rem",
                                md:"2rem"},
                            fontWeight: "bold"
                        },
                        "& .MuiInput-underline:before": {
                            borderBottom: "none"
                        }
                    }}
                    onChange={(event) => handleQuizInfoInputChange("title", event.target.value)} 
                    variant="standard"
                    helperText={checkFieldErrorMessage("title")}
                    error={!!checkFieldErrorMessage("title")} 
                    fullWidth={true}/>
                
                <Box
                    component="div"
                    sx={{
                        display: "flex",
                        flexFlow: {
                            xs: "column",
                            md: "row"
                        },
                        justifyContent: {
                            md:"space-between"
                        }
                    }} >
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
                    <Box 
                        component={"div"}
                        sx={{
                            alignSelf: {md: "end", xs: "center"},
                            display: "flex",
                            flexFlow: "row",
                            justifyContent: "space-between",
                            gap: 3
                        }}
                        >
                        <Tooltip title="Save Quiz" arrow={true} placement="bottom">
                            <IconButton
                                disabled={checkQuestionErrorExist(questionList)}
                                type="submit"
                                aria-label="save quiz" 
                                sx={{
                                    height: "fit-content",
                                    alignSelf: {md: "end", xs: "center"},
                                    padding:0,
                                    marginTop: {md: 0, xs: 5},
                                    marginRight: 0,
                                    color: 'secondary.main'
                                    }}>
                                <SaveAsOutlinedIcon 
                                    // color="success"
                                    fontSize={"large"}
                                />
                            </IconButton>
                        </Tooltip>

                        <Tooltip 
                            title="Add a question" 
                            arrow={true} 
                            placement="bottom"
                        >
                            <IconButton 
                                aria-label="add question"
                                onClick={() => dispatch({type: "create", quizId: quizInfo._id || ""})}
                                sx={{
                                    height: "fit-content",
                                    padding:0,
                                    marginTop: {md: 0, xs: 5}
                                    }}>
                                    <LibraryAddIcon 
                                        color="primary" 
                                        fontSize="large"/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>

                {
                    questionList.map((q,i) => (
                        <QuestionEditableCard
                            key={q._id}
                            question={q}
                            dispatch={dispatch}
                        />
                    ))
                }
            </Box>
    )
}