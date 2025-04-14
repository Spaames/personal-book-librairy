import mongoClientPromise from "@/utils/mongodb";
import {dbName} from "@/utils/mongodb";
import {NextRequest, NextResponse} from "next/server";
import {LibraryDocument} from "@/utils/types";

/**
 * DELETE /api/deleteBookWish
 * Body JSON : { bookEan, username }
 *
 * Remove book from the user wishlist
 */

export async function DELETE(req: NextRequest) {
    try {
        const { bookEan, username } = await req.json();

        if (!bookEan || !username) {
            return NextResponse.json({ message: "no book ean or username" }, { status: 400 });
        }

        const mongoClient = await mongoClientPromise;
        const db = mongoClient.db(dbName);
        const collection = db.collection<LibraryDocument>("wishlists");

        const result = await collection.updateOne(
            { username },
            { $pull: { books: { ean: bookEan } } }
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json({ message: "Book not found or already deleted" }, { status: 404 });
        }

        return NextResponse.json({ message: "Block deleted successfully", ean: bookEan}, { status: 200 });
    } catch (e) {
        console.error("Error deleting block:", e);
        return NextResponse.json({ message: "Failed to delete Block" }, { status: 500 });
    }
}