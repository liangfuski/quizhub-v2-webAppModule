import { getQuizQuestionsByQuizId, getQuizListByCondition } from "@/api/route";
import { Question, Quiz } from "@/utils/type";
import QuizManagementForm from "@/component/QuizManagementForm";
/* eslint-disable @typescript-eslint/no-unused-vars */
export default async function QuizEditPage({ params} : { params: { _id: string }} ) {
    const quizId = params._id;
    const quizResponseList: Quiz[]  = await getQuizListByCondition({ quizId });

    let quizInfo: Quiz; 
    if (quizResponseList.length != 1) {
        throw new Error("Quiz Not Found");
    }
    [quizInfo] = quizResponseList; 

    const questionList: Question[] = await getQuizQuestionsByQuizId({quizId})
    return (
        <div>
            <QuizManagementForm quizInfo={quizInfo} questions={questionList}/>
            {questionList.map(ele => (<div key={ele.id} style={{padding:"10px"}}>
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