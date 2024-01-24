import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/dbConfig/dbConfig";
export const dynamic = 'force-dynamic'
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const title = searchParams.get("title");
        let { db } = await connectToDatabase();
        let posts = await db
            .collection('schedules')
            .find({ 'title': { '$in': [title] } })
            .toArray();
        let topAiring = await db
            .collection('toplists')
            .find({ 'title': { '$in': [title] } })
            .toArray();
        return NextResponse.json(
            {
                query: [...posts, ...topAiring]
            },
            {
                status: 200,
                headers: {
                    'content-type': 'application/json',
                    'cache-control': 'public, max-age=31536000, immutable',
                },

            });
    } catch (error) {
        // return the error
        return NextResponse.json({
            message: new Error(error).message,
            success: false,
            status: 500,
        });
    }

}
