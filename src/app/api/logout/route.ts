import { NextResponse } from "next/server";


/**
 * GET /api/logout
 *
 * Logout the user by removing the AUTH cookie. The middleware will redirect afterward
 */

export async function GET() {
    const response = NextResponse.json({message: "user logged out"});

    response.cookies.set("authToken", "", {
        httpOnly: true,
        secure: false,
        expires: new Date(0),
        path: "/",
    });

    return response;
}