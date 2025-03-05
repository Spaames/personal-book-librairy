import {NextRequest, NextResponse} from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoClientPromise from "@/utils/mongodb";
import { dbName } from "@/utils/mongodb";

/**
 * POST : /api/login
 * Body JSON : { username, password}
 *
 * Check if user exist and compare hashed password
 * */

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();
        if (!username || !password) {
            return NextResponse.json({ message: "Username and password are required" }, { status: 400});
        }

        const mongoClient = await mongoClientPromise;
        const db = mongoClient.db(dbName);
        const usersCollection = db.collection("users");

        const existingUser = await usersCollection.findOne({ username });
        if (!existingUser) {
            return NextResponse.json({ message: "Username does not exist" }, { status: 401});
        }

        const isValidPassword = await bcrypt.compare(password, existingUser.password);
        if (!isValidPassword) {
            return NextResponse.json({ message: "Invalid password" }, { status: 401 });
        }

        const token = jwt.sign(
            {
                username: existingUser.username,
            },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" },
        )

        const response = NextResponse.json({ message: "Authentication successful", username: existingUser.username });
        response.cookies.set("authToken", token, {
            httpOnly: true,
            secure: false, //change for prod
            maxAge: 60 * 60 * 12,
            path: "/",
            sameSite: "strict",
        });

        return response;

    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: "Internal server error : /api/login" }, { status: 500 })
    }
}