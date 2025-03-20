import { NextRequest, NextResponse } from "next/server";
import mongoClientPromise from "@/utils/mongodb";
import {dbName} from "@/utils/mongodb";

/**
 * POST /api/getLibrary
 * body : username
 *
 * Get all books data in the library of the user
 */