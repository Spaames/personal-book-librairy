import mongoClientPromise from "@/utils/mongodb";
import { dbName } from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

/**
 * DELETE /api/deleteAccount
 * Body JSON : { username }
 *
 * Delete the account of the user
 */

export async function DELETE(req: NextRequest) {
    try {
        const { username } = await req.json();
        console.log(username);

        if (!username) {
            return NextResponse.json({ message: "Missing username" }, { status: 400 });
        }

        const mongoClient = await mongoClientPromise;
        const db = mongoClient.db(dbName);

        const usersCol = db.collection("users");
        const libsCol = db.collection("libraries");
        const wishlistCol = db.collection("wishlists");

        const userResult = await usersCol.deleteOne({ username });
        await libsCol.deleteOne({ username });
        await wishlistCol.deleteOne({ username });

        if (userResult.deletedCount === 0) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Account and all dataa deleted successfully",
            username
        }, { status: 200 });

    } catch (e) {
        console.error("Error deleting account:", e);
        return NextResponse.json({ message: "Failed to delete account" }, { status: 500 });
    }
}
