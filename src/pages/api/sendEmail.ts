import  type { EmailData } from "~/utils/types"

const getBaseUrl = () => {
    if (typeof window !== "undefined") return "" // browser should use relative url
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url
    return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}


export function sendEmail(data: EmailData) {
    const apiEndpoint = `${getBaseUrl()}/api/emailApi`
    fetch(apiEndpoint, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((response) => {
            throw response
        })
        .catch((err) => {
            throw err
        })
}
