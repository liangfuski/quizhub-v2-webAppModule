import { Quiz, Question } from "../utils/type";

const ROOT_PATH = process.env.NEXT_PUBLIC_ROOT_PATH;

export async function getQuizList(): Promise<Quiz[]> {
    const res = await fetch(`${ROOT_PATH}/quiz`);
    return res.json();
}


export async function getQuizListByCondition ({ author, quizId }: { author?: string, quizId?: string }): Promise<quiz[]> {
    const queryObj: {author ?: string, quizId ?: string} = {};

    if (author) {
        queryObj.author = author;
    }

    if ( quizId ) {
        queryObj.quizId = quizId
    }

    const res = await fetch(`${ROOT_PATH}/quiz?` + new URLSearchParams(queryObj).toString())
    return res.json();
}


export async function getQuizQuestionsByQuizId({quizId}: {quizId: string}): Promise<Question[]> {
    const res = await fetch(`${ROOT_PATH}/quiz/questions/${quizId}`)
    return res.json();
}