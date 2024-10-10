"use client"
import { TextField, Box } from "@mui/material";
import { Dispatch, useState, memo } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { questionAction, ValidableQuestion } from "./QuestionsReducer";
import { isEqual } from "lodash";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type QuestionEditableCardProps = {
    question: ValidableQuestion,
    dispatch: Dispatch<questionAction>,
};

// export default function 
const QuestionEditableCard = memo(
    ({question, dispatch}: QuestionEditableCardProps) => {
    
    // console.log("Card is rendered")
    const [editableQuestion, setEditableQuestion] = useState<ValidableQuestion>(question)

    function handleOnBlur(){
        if(!isEqual(question, editableQuestion)||
            // new Question 
            (editableQuestion.prompt === "" && editableQuestion.options.filter(ele => ele !=="").length == 0)
        ){
            // console.log("handeEditQuestion is triggered")
            handleEditQuestion(editableQuestion)
        }
    }



    function handleEditableQuestionChange(identifier: string, value: ValidableQuestion[keyof ValidableQuestion]): void {
        setEditableQuestion((preValues) => ({
            ...preValues,
            [identifier]: value
        }))
    }

    

    function handleOptionChange(index: number, value: string): void {
        const newOptions = [...editableQuestion.options];
        newOptions[index] = value;

        handleEditableQuestionChange("options", newOptions);
    }

    function handleEditQuestion(question: ValidableQuestion): void {
        dispatch({ type: "edit", question});
    }

    function handleDeleteQuestion(questionId: string): void{
        dispatch({ type: "delete", questionId })
    }

    const checkFieldErrorMessage = (fieldName: string): string|undefined => {
        // we are not using editableQuestion here because editableQuestion is in sync with question
        // after the question is updated by reducer 
        // to make them sync requires useEffect that cause re-rendering.
        return question?.error?.[fieldName]
    }

    return (
        <Card 
            variant="outlined"
            sx={{
                mt:5, 
                p:2,
                border: "none",
                ".MuiBox-root":{
                    mt:0
                }
                }}>
            <CardContent>
                <Box 
                    component="div"
                    sx={{
                        display: "flex", 
                        flexFlow: "column", 
                        mt:5, 
                        gap: 4,
                        }}>
                    <TextField
                        sx={{mb:1}}
                        label="Question"
                        name={`${editableQuestion._id}_prompt`}
                        fullWidth={true}
                        onChange={(event)=> handleEditableQuestionChange("prompt", event.target.value)}
                        onBlur={handleOnBlur}
                        variant="standard"
                        multiline
                        value={editableQuestion.prompt}
                        helperText={checkFieldErrorMessage("prompt")}
                        error={!!checkFieldErrorMessage("prompt")}
                    />
                    <Box
                        sx={{display: "flex", flexFlow:"column", mt:2, gap: 2, width: {md: "50%", xs: "100%"}}}
                    >
                        { question.options.map( (_, i: number) => (
                                <TextField
                                    key={i}
                                    label={`Option ${i + 1}`}
                                    name={`${editableQuestion._id}_option_${i+1}`}
                                    value={editableQuestion.options[i]}
                                    onBlur={handleOnBlur}
                                    multiline
                                    helperText={checkFieldErrorMessage(`option_${i+1}`)}
                                    error={!!checkFieldErrorMessage(`option_${i+1}`)}
                                    onChange={(event) => handleOptionChange(i, event.target.value)}
                                />
                            ) )
                        }
                    </Box>
                    <Box component="div" sx={{display: "flex", gap:2, alignSelf: "end", width: {md: "20%", xs:"50%"} }} >
                        <FormControl sx={{ flexGrow: 1}}>
                            <InputLabel 
                                id="demo-simple-select-filled-label" 
                                sx={{
                                    position: "absolute", left:"-15px" }}
                            >Answer</InputLabel>
                            <Select
                                name={`${editableQuestion._id}_answer`}
                                value={editableQuestion.answer}
                                onBlur={handleOnBlur}
                                onChange={(event)=> handleEditableQuestionChange("answer", event.target.value)}
                                variant="standard"
                            >
                            <MenuItem value={0}>Option 1</MenuItem>
                            <MenuItem value={1}>Option 2</MenuItem>
                            <MenuItem value={2}>Option 3</MenuItem>
                            <MenuItem value={3}>Option 4</MenuItem>
                            </Select>
                        </FormControl>
                        <IconButton 
                            aria-label="delete question" 
                            sx={{mt: "1rem"}} 
                            onClick={() => handleDeleteQuestion(editableQuestion!._id || "")}>
                            <DeleteForeverIcon />
                        </IconButton>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
});

export default QuestionEditableCard;