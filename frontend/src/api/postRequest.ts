
const ROOT_PATH = process.env.NEXT_PUBLIC_ROOT_PATH;

export type ResponseError = { error?: string };
export async function postFetch<T>(url: string, body: T): Promise<ResponseError>{
    const res = await fetch(`${ROOT_PATH}/${url}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
    })

    if(!res.ok){
        const errorData = await res.json();
        return {error: errorData.error || "Something went wrong"};
    }

    // this will be an empty object in the success case
    return res.json();
}