import mongoClientPromise from "@/utils/mongodb";
import { dbName } from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";
import {LibraryDocument} from "@/utils/types";

/**
 * POST /api/updateStatusBookLib
 * Body JSON : { bookEan, newStatus, username }
 *
 * change le status du livre
 */

export async function POST(req: NextRequest) {
    try {
        const { bookEan, newStatus, username } = await req.json();

        if (!bookEan || typeof newStatus !== "number" || !username) {
            return NextResponse.json({ message: "Missing or invalid fields" }, { status: 400 });
        }

        const mongoClient = await mongoClientPromise;
        const db = mongoClient.db(dbName);
        const collection = db.collection<LibraryDocument>("libraries");

        const result = await collection.updateOne(
            { username, "books.ean": bookEan },
            { $set: { "books.$.status": newStatus } }
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json({ message: "Book not found or status unchanged" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Book status updated successfully",
            book: { ean: bookEan, status: newStatus }
        }, { status: 200 });

    } catch (e) {
        console.error("Error updating book status:", e);
        return NextResponse.json({ message: "Failed to update book status" }, { status: 500 });
    }
}