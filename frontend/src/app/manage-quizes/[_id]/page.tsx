import { getQuizQuestionsByQuizId } from "@/api/route";

/* eslint-disable @typescript-eslint/no-unused-vars */
export default async function QuizEditPage({ params} : { params: { _id: string }} ) {
    const quizId = params._id;
    const questionList = await getQuizQuestionsByQuizId({quizId})
    console.log("called quiz::", quizId);
    return (
        <div>
            {quizId}
            {questionList.map(ele => (<div key={quizId} style={{padding:"10px"}}>
                <div>{ele.id}</div>
                <div>{ele.prompt}</div>
                <div>{ele.answer}</div>
                <div>{
                    ele.options.join("  ") 
                    }</div>
            </div>)
            )}
        </div>
    )   
}
/* eslint-disable @typescript-eslint/no-unused-vars */