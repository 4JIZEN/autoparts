import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req) {
    // Get the pathname of the request (e.g. /, /protected)
    const path = req.nextUrl.pathname;

    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (path === "/list") {
        if (session?.user?.dataValues.isAdmin) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
        return NextResponse.next();
    } else if (path === "/signin") {
        if (session?.user) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    } else if (
        path === "/cart" ||
        path === "/claim" ||
        path === "/user" ||
        path === "/product" ||
        path === "/checkout" ||
        path === "/checkouts"
    ) {
        if (!session?.user) {
            return NextResponse.redirect(new URL("/list", req.url));
        }
    } else if (path === "/dashboard") {
        if (!session?.user?.dataValues.isAdmin) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    return NextResponse.next();
}
