// import { NewUserData } from "../types/table"
// const getBaseUrl = () => {
//     if (typeof window !== "undefined") return "" // browser should use relative url
//     if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url
//     return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
// }


// export const fetchData = async () => {
//     try {
//         const headers = new Headers();
//         const username = 'Supervisor';
//         const password = 'Sup3rv!s0r';
//         const basicAuth = 'Basic ' + btoa(username + ':' + password);

//         headers.append('Access-Control-Allow-Headers', "origin, content-type, accept")
//         headers.append('Access-Control-Allow-Origin', '*');
//         headers.append('Access-Control-Allow-Credentials', 'true')

//         headers.append('Authorization', basicAuth);

//         const response = await fetch('http://10.190.12.26/api/v1/device/strategy/ios/digitalInputs', {
//             headers: headers,
//         });

//         // if (!response.ok) {
//         //     throw new Error('Network response was not ok');
//         // }
//         const jsonData = await response.json() as string[];

//         // console.log(jsonData)
//         return jsonData
//     } catch (error) {
//         throw error
//     }
// }
