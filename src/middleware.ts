export { default } from "next-auth/middleware"
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";


// This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//     return NextResponse.redirect(new URL('/', request.url))
// }
export const config = {
    matcher: [
        '/dashboard',
        '/settings',
    ]
}

// paths that require authentication or authorization
// const requireAuth: string[] = [
//     '/dashboard',
//     '/user/profile',
//     // "/user/update",
//     // '/dashboard/:path*',
//     '/history',
//     '/print/:path*',
//     '/reports'
// ];

// const requireAuthAdmin: string[] = [
//     '/user',
//     '/user/update',
//     '/user/requests',
// ]
// export async function middleware(request: NextRequest) {

//     const res = NextResponse.next();
//     const pathname = request.nextUrl.pathname;

//     if (requireAuth.some((path) => pathname.startsWith(path))) {
//         const token = await getToken({
//             req: request,
//             secret: process.env.SECRET,
//         });
//         //check not logged in
//         if (!token) {
//             const url = new URL(`/user/login`, request.url);
//             url.searchParams.set("callbackUrl", encodeURI(request.url));
//             return NextResponse.redirect(url);
//         }

//     }

//     //check if not authorized as admin
//     else if (requireAuthAdmin.some((path) => pathname.endsWith(path))) {
//         const token = await getToken({
//             req: request,
//             secret: process.env.SECRET,
//         });
//         // const url = new URL(`/user/login`, request.url);
//         // return NextResponse.rewrite(url);
//         //check not logged in
//         if (!token) {
//             const url = new URL(`/user/login`, request.url);
//             url.searchParams.set("callbackUrl", encodeURI(request.url));
//             return NextResponse.redirect(url);
//         }

//         if (token?.currentRole !== 4) {
//             const url = new URL(`/dashboard`, request.url);
//             return NextResponse.redirect(url);
//         }
//     }
//     return res;
// }
