import { NextApiRequest, NextApiResponse } from "next";

export const dynamic = "force-dynamic"; // defaults to auto
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const headers = new Headers();
        const username = "Supervisor";
        const password = "Sup3rv!s0r";
        const basicAuth = "Basic " + btoa(username + ":" + password);

        headers.append(
            "Access-Control-Allow-Headers",
            "origin, content-type, accept"
        );
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append("Access-Control-Allow-Credentials", "true");

        headers.append("Authorization", basicAuth);

        const response = await fetch(
            "http://10.190.12.26/api/v1/device/strategy/vars/floats",
            {
                next: { revalidate: 10 },
                headers: headers,
            },);

        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }
        const jsonData = (await response.json()) as string[];

        // console.log(jsonData);
        // return jsonData
        void res.revalidate('/dashboard')
        res.status(200).json({ revalidated: true, jsonData });
    } catch (error) {
        console.error("Error fetching data from external API:", error);
        res.status(500).json({
            error: "Failed to fetch data from external API",
        });
    }
}
