import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/dbConfig/dbConfig"; 
export async function GET() {
    try { 
        let { db } = await connectToDatabase(); 
        let posts = await db
            .collection('toplists')
            .find({})
            .sort({ published: -1 })
            .toArray(); 
        return NextResponse.json(
            {
                message: posts
            },
            {
                status: 200

            });
    } catch (error) { 
        return NextResponse.json({
            message: new Error(error).message,
            success: false,
        });
    }
}
