import { notFound } from "next/navigation";
import { getQuizQuestionsByQuizId } from "@/api/route";

export default async function QuizEditPage({ params} : { params: { _id: string }} ) {
    const quizId = params._id;
    const questionList = await getQuizQuestionsByQuizId({quizId})
    const question = questionList[0]
    return (
        <div/>
    )
}