import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoClientPromise from "@/utils/mongodb";
import {dbName} from "@/utils/mongodb";

/**
 * POST /api/register
 * Body JSON : { username, fistName, lastName, password }
 *
 * Register the user in DB with hashed password and create an empty library and wishlist
 */

export async function POST(req: NextRequest) {
    try {
        const { username, firstName, lastName, password } = await req.json();

        if (!username || !password || !firstName || !lastName ) {
            return NextResponse.json({ message: "all fields are required" }, { status: 400 });
        }

        const mongoClient = await mongoClientPromise;
        const db = mongoClient.db(dbName);
        const usersCollection = db.collection("users");
        const libraryCollection = db.collection("libraries");
        const wishlistCollection = db.collection("wishlists");

        const existingUser = await usersCollection.findOne({ username });
        if (existingUser) {
            return NextResponse.json({ message: "Username already exist" });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const result = await usersCollection.insertOne({ username, firstName, lastName, password: hashedPass });

        await libraryCollection.insertOne({
            username,
            books: []
        });

        await wishlistCollection.insertOne({
            username,
            books: []
        });

        return NextResponse.json({ message: "User registered", userId: result.insertedId }, {status: 201});
    }
    catch (error) {
        console.error("Error during registration", error);
        return NextResponse.json({ message: "Internal server error THUNK : /api/register" }, {status: 500});
    }
}