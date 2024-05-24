import { NextApiRequest, NextApiResponse } from "next";

// export const dynamic = "force-dynamic"; // defaults to auto
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const headers = new Headers();
        const username = "Supervisor";
        const password = "5up3rv150r";
        const basicAuth = "Basic " + btoa(username + ":" + password);

        headers.append(
            "Access-Control-Allow-Headers",
            "origin, content-type, accept"
        );
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append("Access-Control-Allow-Credentials", "true");

        headers.append("Authorization", basicAuth);

        const response = await fetch(
            `${process.env.GEN_ENDPOINT_3}/api/v1/device/strategy/ios/digitalOutputs/Stop_XR2/state`,
            {
                method: 'POST',
                // next: { revalidate: 1800 },
                headers: headers,
                body: req.body as BodyInit
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
