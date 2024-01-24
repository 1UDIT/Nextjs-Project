import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/dbConfig/dbConfig"; 
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const Season = searchParams.get("Season");
        let { db } = await connectToDatabase(); 
        let posts = await db
            .collection('schedules')
            .find({ 'Season': { '$in': [Season] } })
            .limit(4)
            .toArray(); 
        return NextResponse.json(
            {
                query: posts
            },
            {
                status: 200
            });

    } catch (error) { 
        return NextResponse.json({
            message: new Error(error).message,
            success: false,
        }, {
            status: 400,
        });
    }

}
