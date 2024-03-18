// import { NewUserData } from "../types/table"

const getBaseUrl = () => {
    if (typeof window !== "undefined") return "" // browser should use relative url
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url
    return  `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}


export function dataApi() {
    const apiEndpoint = `https://jsonplaceholder.typicode.com/todos/1`
    fetch(apiEndpoint, {
        // method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => { res.json()})
        .then((response) => {
            // console.log(response)
            throw response
        })
        .catch((err) => {
            throw err
        })
}
