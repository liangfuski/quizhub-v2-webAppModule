import { quiz } from "../type";

const ROOT_PATH = "http://localhost:3001/api"

export async function getQuizList(): Promise<quiz[]> {
    const res = await fetch(`${ROOT_PATH}/quiz`);
    return res.json()
}