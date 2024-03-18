import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
    message: string
}

export default async function fetchData(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const result = fetch('https://jsonplaceholder.typicode.com/todos/1',
            {
                // method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => res.json())
            .then((response) => {
                console.log(response)
                throw response
            })

        // res.status(200).json({
        //     message:
        //         "Successsfully got data",
        // })
    } catch (err) {
        res.status(500).json({ error: 'failed to load data' })
    }
}