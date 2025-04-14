import { NextRequest, NextResponse } from "next/server";
import mongoClientPromise from "@/utils/mongodb";
import {dbName} from "@/utils/mongodb";

/**
 * POST /api/getWishlist
 * body : username
 *
 * Get all books data in the wishlist of the user
 */

export  async function POST(req: NextRequest) {
    try {
        const { username } = await req.json();
        if (!username) {
            return NextResponse.json({ message: "username is required" });
        }

        const mongoClient = await mongoClientPromise;
        const db = mongoClient.db(dbName);
        const wishlistCollection = db.collection("wishlists");

        const userWishlist = await wishlistCollection.findOne({
            username: username.toString(),
        });

        if (!userWishlist || !userWishlist.books) {
            return NextResponse.json({ message: `No books found for user ${username}` }, { status: 404 });
        }

        return NextResponse.json({ message: "Books retrieved successfully", books: userWishlist.books, status: 200 });
    } catch (err) {
        console.log("Error while fetching players",err);
    }
}