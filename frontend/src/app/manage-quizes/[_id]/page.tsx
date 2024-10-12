import { getQuizQuestionsByQuizId, getQuizListByCondition } from "@/api/route";
import { Question, Quiz } from "@/utils/type";
import QuizManagementForm from "@/component/QuizManagement/QuizManagementForm";
/* eslint-disable @typescript-eslint/no-unused-vars */
export default async function QuizEditPage({ params} : { params: { _id: string }} ) {
    const quizId = params._id;
    const quizResponseList: Quiz[]  = await getQuizListByCondition({ quizId });

    if (quizResponseList.length != 1) {
        throw new Error("Quiz Not Found");
    }
    const [quizInfo] = quizResponseList; 

    const questionList: Question[] = await getQuizQuestionsByQuizId({quizId})
    return (
        <div>
            <QuizManagementForm quizInfo={quizInfo} questions={questionList}/>
        </div>
    )   
}
/* eslint-disable @typescript-eslint/no-unused-vars */