import { NextRequest, NextResponse } from "next/server";
import mongoClientPromise from "@/utils/mongodb";
import {dbName} from "@/utils/mongodb";

/**
 * POST /api/addBookWish
 * Body JSON : { book, username }
 *
 * Add book to the user's wishlist
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
        const wishlistCollection = db.collection("wishlists");

        const wishlist = await wishlistCollection.findOne({ username });
        if (!wishlist) {
            return NextResponse.json({ message: "No existing wishlist for this user" });
        }

        const result = await wishlistCollection.updateOne(
            { username },
            { $push: { books: book } }
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json({ message: "Failed to add book" }, { status: 500 });
        }

        return NextResponse.json({ message: "Book added successfully", book: book }, { status: 200 });
    }
    catch (error) {
        console.error("Error during request", error);
        return NextResponse.json({ message: "Internal server error THUNK : /api/addBookWish" }, {status: 500});
    }
}