import { getQuizQuestionsByQuizId } from "@/api/route";

/* eslint-disable @typescript-eslint/no-unused-vars */
export default async function QuizEditPage({ params} : { params: { _id: string }} ) {
    const quizId = params._id;
    const questionList = await getQuizQuestionsByQuizId({quizId})
    console.log(questionList)
    return (
        <div/>
    )
}
/* eslint-disable @typescript-eslint/no-unused-vars */