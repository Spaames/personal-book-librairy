import { NextRequest, NextResponse } from "next/server";
import mongoClientPromise from "@/utils/mongodb";
import {dbName} from "@/utils/mongodb";

/**
 * POST /api/getLibrary
 * body : username
 *
 * Get all books data in the library of the user
 */

export  async function POST(req: NextRequest) {
    try {
        const { username } = await req.json();
        if (!username) {
            return NextResponse.json({ message: "username is required" });
        }

        const mongoClient = await mongoClientPromise;
        const db = mongoClient.db(dbName);
        const libraryCollection = db.collection("libraries");

        const userLibrary = await libraryCollection.findOne({
            username: username.toString(),
        });

        if (!userLibrary || !userLibrary.books) {
            return NextResponse.json({ message: `No books found for user ${username}` }, { status: 404 });
        }

        return NextResponse.json({ message: "Books retrieved successfully", books: userLibrary.books, status: 200 });
    } catch (err) {
        console.log("Error while fetching players",err);
    }
}