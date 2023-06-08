import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req) {
    // Get the pathname of the request (e.g. /, /protected)
    const path = req.nextUrl.pathname;

    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (path === "/") {
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
            return NextResponse.redirect(new URL("/", req.url));
        }
    } else if (path === "/dashboard") {
        if (!session?.user?.dataValues.isAdmin) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    // console.log(session?.user.dataValues);

    // if (session) {
    //     if (path === "/dashboard" && !session?.user?.dataValues.isAdmin) {
    //         return NextResponse.redirect(new URL("/", req.url));
    //     }
    // }

    // if (session && path === "/signin") {
    //     return NextResponse.redirect(new URL("/", req.url));
    // }

    // if (!session) {
    //     if (
    //         path === "/cart" ||
    //         path === "/claim" ||
    //         path === "/user" ||
    //         path === "/product" ||
    //         path === "/checkout" ||
    //         path === "/checkouts"
    //     ) {
    //         return NextResponse.redirect(new URL("/signin", req.url));
    //     }
    // }
    return NextResponse.next();
}
