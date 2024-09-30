import { quiz } from "../type";

const ROOT_PATH = process.env.NEXT_PUBLIC_ROOT_PATH;

export async function getQuizList(): Promise<quiz[]> {
    const res = await fetch(`${ROOT_PATH}/quiz`);
    return res.json()
}