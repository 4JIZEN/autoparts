import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req) {
    // Get the pathname of the request (e.g. /, /protected)
    const path = req.nextUrl.pathname;

    // If it's the root path, just render it
    if (path === "/") {
        return NextResponse.next();
    }

    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });
    if (session && path === "/signin") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (!session) {
        if (
            path === "/cart" ||
            path === "/claim" ||
            path === "/user" ||
            path === "/product" ||
            path === "/checkout" ||
            path === "/checkouts"
        ) {
            return NextResponse.redirect(new URL("/signin", req.url));
        }
    }
    return NextResponse.next();
}
