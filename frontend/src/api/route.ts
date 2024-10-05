import { quiz, question } from "../type";

const ROOT_PATH = process.env.NEXT_PUBLIC_ROOT_PATH;

export async function getQuizList(): Promise<quiz[]> {
    const res = await fetch(`${ROOT_PATH}/quiz`);
    return res.json();
}


export async function getQuizListByUserId({ author }: { author: string }): Promise<quiz[]> {
    const res = await fetch(`${ROOT_PATH}/quiz?` + new URLSearchParams({ author }).toString())
    return res.json();
}


export async function getQuizQuestionsByQuizId({quizId}: {quizId: string}): Promise<question[]> {
    const res = await fetch(`${ROOT_PATH}/quiz/questions/${quizId}`)
    return res.json();
}