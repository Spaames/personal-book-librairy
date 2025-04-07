import { NextRequest, NextResponse } from "next/server";
import mongoClientPromise from "@/utils/mongodb";
import {dbName} from "@/utils/mongodb";

/**
 * POST /api/addBookLib
 * Body JSON : { book, username }
 *
 * Add book to the user's library
 */

export async function POST(req: NextRequest) {
    try {
        const { book, username } = await req.json();

        if (!book ) {
            return NextResponse.json({ message: "no book passed to the body" }, { status: 400 });
        }
        if (!username) {
            return NextResponse.json({ message: "username is required" });
        }

        const mongoClient = await mongoClientPromise;
        const db = mongoClient.db(dbName);
        const libraryCollection = db.collection("libraries");

        const library = await libraryCollection.findOne({ username });
        if (!library) {
            return NextResponse.json({ message: "No existing library for this user" });
        }

        const result = await libraryCollection.updateOne(
            { username },
            { $push: { books: book } }
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json({ message: "Failed to add book" }, { status: 500 });
        }

        return NextResponse.json({ message: "Book added successfully", book: book }, { status: 200 });
    }
    catch (error) {
        console.error("Error during registration", error);
        return NextResponse.json({ message: "Internal server error THUNK : /api/register" }, {status: 500});
    }
}